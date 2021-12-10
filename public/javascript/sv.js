let thesisInfo
let activeGroupName
let detailAssignmentId

$(document).ready(() => {

    getGroups()

    if ($('#selectListCategory').length > 0) {
        getThesisCategories()
    }

    if($('#selectListLecturer').length > 0) {
        getLecturerList()
    }

    if($('#tbExampleList').length > 0) {
        getExampleThesisList()
    }

    if($('#tbThesisList').length > 0) {
        getThesisList()
    }

    if($('#tbThesisTracking').length > 0) {
        trackingThesis()
    }

    if($('#groupContent').length > 0) {
        getAssignmentList()
    }

    if($('#nameAssingment').length > 0) {
        getDetailAssignment()
        setComments()
    }

});

// Lấy danh sách mảng đề tài
function getThesisCategories() {
    $.ajax({
        url: getAPIUrl("category/list"),
        method: "GET",
        data: null,
        success: (response) => {
            if(typeof response === 'object') {
                response.forEach((categories) => {
                    const category = new Option(categories['name'], categories['category_id']);
                    $("#selectListCategory").append(category);
                });
            }
        }
    });
}

// Lấy danh sách giảng viên
function getLecturerList() {
    $.ajax({
        url: getAPIUrl("users/list"),
        method: "GET",
        data: {role: 'gv'},
        success: (response) => {
            if(typeof response === 'object') {
                response.forEach(lecturers => {
                    const lecturer = new Option(lecturers['name'], lecturers['id'])
                    $('#selectListLecturer').append(lecturer)
                })
            }
        }
    })
}

// Lấy danh sách đề tài mẫu
function getExampleThesisList() {

    let thesisCategory = $('#selectListCategory').val()
    if(thesisCategory == 0) {
        thesisCategory = -1
    }
    let title = $('#searchThesis').val()

    $.ajax({
        url: getAPIUrl("example/list"),
        method: "GET",
        data: {
            page: 1,
            limit: 25,
            cat_id: thesisCategory,
            title: title
        },
        success: response => {
            if(typeof response === 'object') {
                let i = 0
                let html = ''
                $('#tbExampleList').html(html)
                response.forEach(thesisList => {
                    const listExample = response;
                    i++;
                    html += `
                        <tr>
                            <th scope="row">${i}</th>
                            <td>${thesisList['title']}</td>
                            <td>${thesisList['cat']['name']}</td>
                        </tr>
                    `
                })
                $('#tbExampleList').html(html)
            }
        }
    })
}

// Lấy danh sách đề tài đã được đăng ký
function getThesisList() { 

    let thesisCategory = $('#selectListCategory').val()
    if(thesisCategory == 0) {
        thesisCategory = -1
    }
    let title = $('#searchThesis').val()

    $.ajax({
        url: getAPIUrl("thesis/list"),
        method: "GET",
        data: {
            page: 1,
            limit: 25,
            cat_id: thesisCategory,
            title: title
        },
        success: (response) => {
            let i = 0
            let status = ''
            let html = ''
            response.forEach(thesisList => {
                i++
                if(thesisList['approve'] == 0) {
                    status = '<span class="status waiting">Chờ duyệt</span>'
                } else if(thesisList['approve'] == 1) {
                    status = '<span class="status approved">Đã duyệt</span>'
                }
                html += `
                    <tr>
                        <th scope="row">${i}</th>
                        <td>${thesisList['title']}</td>
                        <td>${thesisList['cat']['name']}</td>
                        <td>${thesisList['sv']['name']}</td>
                        <td>${thesisList['gv']['name']}</td>
                        <td>${status}</td>
                    </tr>
                `
            })
            $('#tbThesisList').html(html)
        }
    })
}


// Đăng ký đề tài
function registerThesis() {
    let id = user['id']
    let title = $("#registerTitle").val().trim()
    let des = $("#registerDes").val().trim()
    let category = $("#selectListCategory").val()
    let lecturer = $("#selectListLecturer").val()

    if (title == "") {
        alert("Tên đề tài không được để trống!");
        return false;
    }

    if (lecturer == 0) {
        alert("Vui lòng chọn giảng viên hướng dẫn!");
        return false;
    }

    if (category == 0) {
        alert("Vui lòng chọn mảng đề tài!");
        return false;
    }

    $.ajax({
        url: getAPIUrl("thesis/new"),
        method: "POST",
        data: {
            sv_id: id,
            title: title,
            gv_id: lecturer,
            cat_id: category,
            des: des,
        },
        success: (response) => {
            if(typeof response === 'object') {
                if(response['success'] == true) {
                    alert('Đã gửi yêu cầu đăng ký đề tài thành công!')
                } else {
                    alert('Bạn đã đăng ký đề tài rồi')
                }
                return false
            }
        }
    })
}

// Theo dõi đề tài 
function trackingThesis() {
    let id = user['id']

    $.ajax({
        async: false,
        url: getAPIUrl("thesis/list"),
        method: "GET",
        data: {uid: id},
        success: (response) => {
            if(typeof response === 'object') {

                if(response.length < 1) {
                    $('#tbThesisTracking tbody tr').hide()
                } else {
                    thesisInfo = response[0]
                    $("#titleThesis").text(thesisInfo['title']);
                    $("#categoryThesis").text(thesisInfo['cat']['name']);
                    $("#lecturerThesis").text(thesisInfo['gv']['name']);
                    if(thesisInfo['approve'] == 0) {
                        $("#status").text("Chờ duyệt");
                        $("#status").addClass('waiting');
                    } else if(thesisInfo['approve'] == 1) {
                        $("#status").text("Đã duyệt");
                        $("#status").addClass('approved');
                        $("#thBtnThesis").hide();
                        $("#btnThesis").hide();
                    }
                }
            }
        }
    })
}

// Cập nhật đề tài
function updateRegistedThesis() {

    let thesisId = thesisInfo['thesis_id']
    let title = $("#fixTitleThesis").val().trim()
    let des = $("#fixDesThesis").val().trim()
    let category = $("#selectListCategory").val()
    let lecturer = $("#selectListLecturer").val()

    if (title == "") {
        alert("Tên đề tài không được để trống!");
        return false;
    }

    if (lecturer == 0) {
        alert("Vui lòng chọn giảng viên hướng dẫn!");
        return false;
    }

    if (category == 0) {
        alert("Vui lòng chọn mảng đề tài!");
        return false;
    }

    $.ajax({
        url: getAPIUrl("thesis/update/" + thesisId),
        method: "POST",
        data: {
            cat_id: category, 
            gv_id: lecturer, 
            title: title, 
            des: des
        },
        success: (response) => {
            if (typeof response === 'object') {
                if (response['update'] == true) {
                    alert("Cập nhật thông tin đề tài thành công!");
                    trackingThesis();
                } else {
                    if (response['message'] != "") {
                        alert(response['message']);
                    } else {
                        alert("Vui lòng thử lại sau!");
                    }
                }
                return false;
            }
        }
    })
}

// Xóa đề tài 
function deleteThesis() {
    let thesisId = thesisInfo['thesis_id']

    $.ajax({
        url: getAPIUrl("thesis/remove/" + thesisId),
        method: "DELETE",
        data: null,
        success: (response) => {
            if (typeof response === 'object') {
                if (response['delete'] == true) {
                    alert("Xóa đề tài thành công!");
                    trackingThesis();
                } else {
                    if (response['message'] != "") {
                        alert(response['message']);
                    } else {
                        alert("Vui lòng thử lại sau");
                    }
                }
                return false;
            }
        }
    })
}

/* 
    GROUP
 */

// Lấy ds nhóm
function getGroups() {
    let id = user['id'];
    let url = new URL(window.location.href);
    const gid = url.searchParams.get("gid");

    $.ajax({
        async: false,
        url: getAPIUrl("group/list"),
        method: "GET",
        data: { uid: id },
        success: (response) => {
            if (typeof response === 'object') {
                listGroup = response;
                let html = "";
                response.forEach((group) => {
                    let groupUrl = 'sv/group/show?gid=' + group['g_id']

                    html += '<li class="sidebar-child__item">'
                    html += '<a href="' + getBaseUrl(groupUrl) + '" class="sidebar-child__link '
                    if (group['g_id'] == gid) {
                        activeGroupName = group['name']
                        html += ' active '
                    }
                    html += ' ">'
                    html += '<i class="fas fa-chevron-right"></i>';
                    html += group['name']
                    html += '</a>'
                    html += '</li>'
                });
                $("#listGroup").html(html);
            }
        }
    })
}

// Lấy danh sách bài tập
function getAssignmentList() {
    const url = new URL(window.location.href)
    const groupId = url.searchParams.get('gid')
    if(groupId == null) {
        return false
    }

    $('#groupName').text(activeGroupName)

    $.ajax({
        async: false,
        url: getAPIUrl("assignment/list"),
        method: 'GET',
        data: {gid: groupId},
        success: response => {
            if(typeof response === 'object') {
                response = response.reverse()
                let html = ''
                response.forEach(assignment => {
                    let assignmentUrl = 'sv/group/viewassignment?aid=' + assignment['id']

                    html += `
                        <a href="${getBaseUrl(assignmentUrl)}" class="assingment-link">
                            <div class="assingment">
                                <div class="assingment-icon">
                                    <i class="fas fa-clipboard-list"></i>
                                </div>
                                <div class="assingment-info">
                                    <div class="assingment-detail">
                                        <span class="assingment-detail-heading">${assignment['title']}</span>
                                    </div> 
                                    <div class="assingment-time">
                                        <span>${dateFormat(assignment['postDate'])}</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    `
                })
                $("#groupContent").html(html);
            }
        }
    })
}

// Lấy thông tin chi tiết bài tập
function getDetailAssignment() {
    const id = user['id']
    const url = new URL(window.location.href)
    const aid = url.searchParams.get('aid')
    if(aid == null) {
        return false
    }

    $.ajax({
        async: false,
        url: getAPIUrl("assignment/infor/" + aid),
        method: 'GET',
        data: null,
        success: response => {
            if(typeof response === 'object') {
                $("#nameAssingment").text(response['title']);
                $("#desAssingment").text(response['content']);
                $("#postDate").text(dateFormat(response['postDate']));
                $("#deadline").text(dateFormat(response['deadline']));
            }

            response['detail'].forEach(data => {
                if(data['sv_id'] == id) {
                    $("#scoreAssingment").text(data['score'])
                    detailAssignmentId = data['d_id']
                    if(data['file'] != null) {
                        const gid = response['gid']
                        const assignmentId = response['id'] 
                        const detailId = data['d_id']
                        const fileName = data['file']
                        const urlDownload = `group/${gid}/${assignmentId}/${detailId}/${fileName}`

                        $('#fileSubmitted').text(fileName)
                        $('#fileSubmitted').attr('href', getStorageUrl(urlDownload))
                        $('#fileSubmitted').attr('download', fileName)
                        $("#dateSumitted").text(`Đã nộp: ${dateFormat(data['dateSubmit'])}`, true)
                    }
                }
            })
        }
    })
}

// Nộp bài tập
function submitAssignment() {
    if(detailAssignmentId === null) {
        return false
    }

    const file = $("#formFileSubmit").prop('files')[0]
    if (file === undefined) {
        alert("Vui lòng chọn file!")
        return false;
    }

    const formData = new FormData()
    formData.append('fileSubmit', file)

    $.ajax({
        async: false,
        url: getAPIUrl("assignment/submit/" + detailAssignmentId),
        method: "POST",
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: formData,
        success: response => {
            let rs = JSON.parse(response);
            if (rs['submit'] == true) {
                alert("Đã gửi bài thành công");
                getDetailAssignment();
            } else {
                if (rs['message'] != "") {
                    alert(rs['message']);
                } else {
                    alert("Vui lòng thử lại sau");
                }
            }
            return false;
        }
    });
    return false;
}

// Lấy comment
function setComments() {
    if(detailAssignmentId === null) {
        return false
    }

    $.ajax({
        url: getAPIUrl("assignment/opinion/" + detailAssignmentId),
        method: "GET",
        data: null,
        success: response => {
            let html = ''
            if(typeof response === 'object') {
                
                html += `
                    <label for="" class="form-label">
                        <i class="far fa-comment-alt me-1"></i>
                        Nhận xét
                    </label>
                `
            }

            response.forEach(data => {
                let avatarUrl
                if(data['avatar'] === null) {
                    avatarUrl = getImgUrl('user.png')
                } else {
                    avatarUrl = getStorageUrl(`avatar/${data['avatar']}`)
                }

                html += `
                    <div class="comment-wrapper">
                        <div class="d-flex align-items-center">
                            <div class="cmt-avatar">
                                <img src="${avatarUrl}" class="rounded-circle">
                            </div>
                            <h5 class="cmt-user-name mg-0">${data['name']}</h5>
                            <span class="cmt-time">${dateFormat(data['time'], true)}</span>
                        </div>
                        <p class="cmt-content mg-0">${data['content']}</p>
                    </div>
                `
            })

            html += `
                <div class="comment-add">
                    <label for="" class="form-label">
                        <i class="fas fa-comment-medical me-1"></i>
                        Thêm nhận xét
                    </label>
                    <textarea class="form-control" id="formAddComments" rows="3"></textarea>
                    <button type="button" onclick="addComments();" class="btn btn-secondary mt-3">Gửi</button>
                </div>
            `
            $("#opinionContent").html(html);
        }
    })
}

// Thêm comment
function addComments() {
    if(detailAssignmentId === null) {
        return false
    }

    const content = $('#formAddComments').val().trim()
    if(content === '') {
        alert("Bạn chưa nhập ý kiến!")
        return false
    }

    $.ajax({
        url: getAPIUrl("assignment/opinion/" + detailAssignmentId),
        method: "POST",
        data: {content: content},
        success: response => {
            if(response['opinion'] === true) {
                setComments()
            } else {
                alert('Vui lòng thử lại sau!')
            }
            return false
        }
    })
}