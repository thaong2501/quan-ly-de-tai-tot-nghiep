let thesisList
let exampleThesisList
let exampleThesisId
let groupMembers
let groupMemberId
let assignmentList
let assignmentId
let detailAssisnmentList
let detailAssisnmentId

$(document).ready(() => {

    getGroupList()

    if($('#selectListCategory').length > 0) {
        getThesisCategory()
    }
    
    if($("#tbThesisList").length > 0) {
        getThesisList()
    }

    if($('#tbExampleList').length > 0) {
        getExampleThesisList()
    }

    if($('#listMember').length > 0) {
        getMemberList()
    }

    if($('#listAddMember').length > 0) {
        getStudentList()
    }

    if($('#groupContent').length > 0) {
        getAssignmentList()
    }

    if($('#detailAssisnment').length > 0) {
        getDetailAssignment()
    }
})

// Lấy danh sách mảng đề tài
function getThesisCategory() {
    $.ajax({
        url: getAPIUrl("category/list"),
        method: 'GET',
        success: response => {
            response.forEach(data => {
                const o1 = new Option(data['name'], data['category_id'])
                $(o1).html(data['name'])
                const o2 = new Option(data['name'], data['category_id'])
                $(o2).html(data['name'])
                const o3 = new Option(data['name'], data['category_id'])
                $(o3).html(data['name'])
                $("#selectListCategory").append(o1);
                $("#selectCategoryFix").append(o2);
                $("#selectCategoryRegister").append(o3);
            })
        }
    })
}

// Lấy danh sách đề tài
function getThesisList() {
    const id = user['id']
    let category = $('#selectListCategory').val()
    if(category == 0) {
        category = -1
    }
    const title = $('#searchThesis').val()

    $.ajax({
        url: getAPIUrl("thesis/list"),
        method: 'GET',
        data: {
            page: 1,
            limit: 25,
            uid: id,
            cat_id: category,
            title: title
        },
        success: response => {
            if(typeof response === 'object') {
                response.sort((a, b) => (a.approve > b.approve) ? 1 : -1)
                thesisList = response
                let html = ''
                let i = 0
                response.forEach(thesis => {
                    i++
                    let status = ''
                    if(thesis['approve'] == 0) {
                        status = '<span class="status waiting">Chờ duyệt</span>'
                    } else if (thesis['approve'] == 1) {
                        status = '<span class="status approved">Đã duyệt</span>'
                    }

                    html += `
                        <tr>
                            <th scope="row">${i}</th>
                            <td>${thesis['title']}</td>
                            <td>${thesis['cat']['name']}</td>
                            <td>${thesis['sv']['name']}</td>
                            <td>${status}</td>
                            <td class="thesis-action">
                                <button type="button" onclick="viewThesis(${thesis['thesis_id']});" class="btn btn-secondary thesis-action-btn me-1" data-bs-toggle="modal" data-bs-target="#view-thesis">Xem</button>
                    `
                    if(thesis['approve'] == 0) {
                        html += `
                                <button type="button" onclick="approveThesis(${thesis['thesis_id']});" class="btn btn-success thesis-action-btn" id="confirm-thesis">Duyệt</button>
                                </td>
                            </tr>
                        `
                    }
                })
                $("#tbThesisList").html(html)
            }
        }
    })
}

// Xem đề tài
function viewThesis(id) {
    thesisList.forEach(thesis => {
        if(thesis['thesis_id'] == id) {
            $("#thesisName").val(thesis['title']);
            $("#thesisCategory").val(thesis['cat']['name']);
            $("#thesisStudent").val(thesis['sv']['name']);
            $("#thesisDes").text(thesis['des']);
        }
    })
}

// Duyệt đề tài
function approveThesis(id) {
    $.ajax({
        async: false,
        url: getAPIUrl(`thesis/update/${id}`),
        method: 'POST',
        data: { approve: 1 },
        success: response => {
            console.log(response)
            if(typeof response === 'object') {
                if(response['update'] == true) {
                    alert('Đã duyệt thành công!')
                    getThesisList()
                } else {
                    if(response['message'] != '') {
                        alert(response['message'])
                    } else {
                        alert('Vui lòng thử lại sau!')
                    }
                }
                return false
            }
        }
    })
}

/* 
    Example Thesis
 */

// Lấy danh sách đề tài mẫu
function getExampleThesisList() {
    const id = user['id']
    let category = $("#selectListCategory").val()
    if(category == 0) {
        category = -1
    }
    const title = $("#searchThesis").val()

    $.ajax({
        async: false,
        url: getAPIUrl("example/list"),
        method: 'GET',
        data: {
            page: 1,
            limit: 25,
            uid: id, 
            cat_id: category,
            title: title
        },
        success: response => {
            if(typeof response === 'object') {
                exampleThesisList = response
                let i = 0
                let html = ''
                response.forEach(data => {
                    i++
                    html += `
                        <tr>
                            <th scope="row">${i}</th>
                            <td>${data['title']}</td>
                            <td>${data['cat']['name']}</td>
                            <td>
                                <button type="button" onclick="viewExampleThesis(${data['example_id']});" class="btn btn-secondary thesis-action-btn me-1" data-bs-toggle="modal" data-bs-target="#update-thesis">Sửa</button>
                                <button type="button" onclick="getExampleThesisId(${data['example_id']});" class="btn btn-danger thesis-action-btn" data-bs-toggle="modal" data-bs-target="#delete-thesis">Xóa</button>
                            </td>
                        </tr>
                    `
                })
                $("#tbExampleList").html(html)
            }
        }
    })
}

function getExampleThesisId(id) {
    exampleThesisId = id
}

function viewExampleThesis(id) {
    getExampleThesisId(id)
    exampleThesisList.forEach(data => {
        if(data['example_id'] == id) {
            $("#thesisName").val(data['title'])
            $("#selectCategoryFix").val(data['cat']['cat_id'])
        }
    })
} 

// Thêm đề tài mẫu
function addExampleThesis() {
    const title = $('#registerTitle').val().trim()
    const category = $('#selectCategoryRegister').val()
    const des = $('#registerDes').val().trim()

    if(title == '') {
        alert('Tên đề tài không được để trống!')
        return false
    }

    if(category == 0) {
        alert('Vui lòng chọn mảng đề tài!')
        return false
    }

    $.ajax({
        url: getAPIUrl("example/new"),
        method: 'POST',
        data: {
            cat_id: category,
            title: title,
            des: des
        },
        success: response => {
            if(typeof response === 'object') {
                if(response['success'] == true) {
                    alert('Thêm đề tài mẫu thành công!')
                    getExampleThesisList()
                } else {
                    alert('Vui lòng thử lại sau!')
                }
                return false
            }
        }
    })
}

// Sửa đề tài mẫu
function updateExampleThesis() {
    const id = exampleThesisId
    const title = $('#thesisName').val().trim()
    const category = $('#selectCategoryFix').val()

    if(title == '') {
        alert('Không được để trống tên đề tài!')
        return false
    }

    if(category == 0) {
        alert('Vui lòng chọn mảng đề tài!')
        return false
    }

    $.ajax({
        async: false,
        url: getAPIUrl(`example/update/${id}`),
        method: 'POST',
        data: {
            cat_id: category,
            title: title,
        },
        success: response => {
            if(typeof response === 'object') {
                if(response['update'] == true) {
                    alert('Cập nhật đề tài mẫu thành công!')
                    getExampleThesisList()
                } else {
                    if(response['message'] != null) {
                        alert(response['message'])
                    } else {
                        alert('Vui lòng thử lại sau!')
                    }
                }
                return false
            }
        }
    })
}

// Xóa đề tài mẫu
function deleteExampleThesis() {
    const id = exampleThesisId

    $.ajax({
        url: getAPIUrl(`example/remove/${id}`),
        method: 'DELETE',
        success: response => {
            if(typeof response === 'object') {
                if(response['delete'] == true) {
                    alert('Đã xóa đề tài mẫu thành công!')
                    getExampleThesisList()
                } else {
                    if(response['message'] != null) {
                        alert(response['message'])
                    } else {
                        alert('Vui lòng thử lại sau!')
                    }
                }
                return false
            }
        }
    })
}

/* 
    GROUP 
*/

// Lấy danh sách nhóm
function getGroupList() {
    const id = user['id']
    const url = new URL(window.location.href)
    const groupId = url.searchParams.get('gid')

    $.ajax({
        async: false,
        url: getAPIUrl('group/list'),
        method: 'GET',
        data: {uid: id},
        success: response => {
            if(typeof response === 'object') {
                let html = ''
                html += `
                    <li class="sidebar-child__item">
                        <a href="${getBaseUrl("gv/group/addgroup")}" class="sidebar-child__link 
                `
                if ($("#groupNameCreate").length > 0) {
                    html += 'active';
                }
                html += '">';
                html += '<i class="fas fa-plus-circle"></i>';
                html += 'Tạo nhóm';
                html += '</a>';
                html += '</li>'

                response.forEach(data => {
                    const groupUrl = `gv/group/show?gid=${data['g_id']}`
                    html += '<li class="sidebar-child__item">'
                    html += `<a href="${getBaseUrl(groupUrl)}" class="sidebar-child__link `
                    if(data['g_id'] == groupId) {
                        const activeGroupName = data['name']
                        $('#nameGroupFix').val(activeGroupName)
                        $('#nameGroup').text(activeGroupName)
                        html += 'active'
                    }
                    html += ' ">';
                    html += '<i class="fas fa-chevron-right"></i>';
                    html += data['name'];
                    html += '</a>';
                    html += '</li>'
                })
                $("#listGroup").html(html)
            }
        }
    })
}

// Tạo nhóm mới
function createGroup() {
    const groupName = $('#groupNameCreate').val().trim()
    if(groupName == '') {
        alert('Tên nhóm không được để trống!')
        return false
    }

    $.ajax({
        url: getAPIUrl('group/new/'),
        method: 'POST',
        data: {name: groupName},
        success: response => {
            if(typeof response === 'object') {
                if(response['success'] === true) {
                    alert('Tạo nhóm thành công!')
                    getGroupList()
                } else {
                    alert('Vui lòng thử lại sau!')
                }
                return false
            }
        }
    })
}

// Đổi tên nhóm
function renameGroup() {
    const url = new URL(window.location.href)
    const groupId = url.searchParams.get('gid')
    const groupName = $('#nameGroupFix').val().trim()

    if(groupName == '') {
        alert('Tên nhóm không được để trống!')
        return false
    }

    $.ajax({
        url: getAPIUrl(`group/update/${groupId}`),
        method: 'POST',
        data: {name: groupName},
        success: response => {
            if(typeof response === 'object') {
                if(response['update'] == true) {
                    alert('Đổi tên nhóm thành công!')
                    getGroupList()
                } else {
                    alert('Vui lòng thử lại sau!')
                }
                return false
            }
        }
    })
}

// Xóa nhóm
function deleteGroup() {
    const url = new URL(window.location.href)
    const groupId = url.searchParams.get('gid')

    $.ajax({
        url: getAPIUrl(`group/remove/${groupId}`),
        method: 'DELETE',
        success: response => {
            if(typeof response === 'object') {
                if(response['delete'] == true) {
                    alert('Xóa nhóm thành công!')
                    location.href = getBaseUrl('gv/')
                } else {
                    alert('Vui lòng thử lại sau!')
                }
                return false
            }
        }
    })

}

/* 
    GROUP MEMBERS 
*/

// Lấy danh sách sinh viên trong nhóm
function getMemberList() {
    const url = new URL(window.location.href)
    const groupId = url.searchParams.get('gid')
    if(groupId == null) {
        return false
    }

    $.ajax({
        async: false,
        url: getAPIUrl(`group/member/${groupId}`),
        method: 'GET',
        success: response => {
            if(typeof response === 'object') {
                groupMembers = response
                let html = ''
                let i = 0
                response.forEach(student => {
                    i++
                    html += `
                        <tr>
                            <th scope="row">${i}</th>
                            <td>${student['id']}</td>
                            <td>${student['name']}</td>
                            <td>${student['majors']['majors_name']}</td>
                            <td>${student['thesis']}</td>
                    `
                    html += '<td>'
                    html += '<button type="button" onclick="getGroupMemberId(\'' + student['id'] + '\');" class="btn btn-danger table-btn" data-bs-toggle="modal" data-bs-target="#delete-group-member">Xóa</button>';
                    html += '</td>';
                    html += '</tr>'
                })
                $("#listMember").html(html)
            }
        }
    })
}

// Lấy danh sách sinh viên 
function getStudentList() {
    const id = user['id']
    const url = new URL(window.location.href)
    const groupId = url.searchParams.get('gid')
    if(groupId == null) {
        return false
    }

    $.ajax({
        async: false,
        url: getAPIUrl('thesis/list'),
        method: 'GET',
        data: {uid: id},
        success: response => {
            if(typeof response === 'object') {
                let html = ''
                let i = 0
                response.forEach(data => {
                    if(data['approve'] == 1) {
                        let check = true
                        groupMembers.forEach(member => {
                            if(data['sv']['sv_id'] == member['id']) {
                                check = false
                                return
                            }
                        })

                        if(check) {
                            i++
                            html += '<tr>';
                            html += '<th scope="row">' + i + '</th>';
                            html += '<td>' + data['sv']['sv_id'] + '</td>';
                            html += '<td>' + data['sv']['name'] + '</td>';
                            html += '<td>' + data['sv']['majors']['majors_name'] + '</td>';
                            html += '<td>' + data['title'] + '</td>';
                            html += '<td>'
                            html += '<button type="button" onclick="addMember(\'' + data['sv']['sv_id'] + '\');" class="btn btn-warning table-btn">Thêm</button>';
                            html += '</td>';
                            html += '</tr>'
                        }
                    }
                })
                $("#listAddMember").html(html)
            }
        }
    })
}

function getGroupMemberId(id) {
    groupMemberId = id
}

// Xóa sinh viên khỏi nhóm
function deleteMember() {
    const memberId = groupMemberId
    const url = new URL(window.location.href)
    const groupId = url.searchParams.get('gid')
    if(groupId == null) {
        return false
    }

    $.ajax({
        async: false,
        url: getAPIUrl(`group/member/${groupId}?sv_id=${memberId}`),
        method: 'DELETE',
        success: response => {
            if(typeof response === 'object') {
                if(response['success'] == true) {
                    alert('Đã xóa thành công!')
                    getMemberList()
                    getStudentList()
                } else {
                    alert('Vui lòng thử lại sau!')
                }
                return false
            }
        }
    })
}

// Thêm sinh viên vào nhóm
function addMember(id) {
    const url = new URL(window.location.href)
    const groupId = url.searchParams.get('gid')
    if(groupId == null) {
        return false
    }

    $.ajax({
        async: false,
        url: getAPIUrl(`group/member/${groupId}`),
        method: 'POST',
        data: { sv_id: id },
        success: response => {
            if(typeof response === 'object') {
                if(response['success'] == true) {
                    alert('Đã thêm thành công!')
                    getMemberList()
                    getStudentList()
                } else {
                    alert('Vui lòng thử lại sau!')
                }
                return false
            }
        }
    })
}

/* 
    ASSIGNMENT
*/

// Lấy danh sách bài tập
function getAssignmentList() {
    const url = new URL(window.location.href)
    const groupId = url.searchParams.get('gid')
    if(groupId == null) {
        return false
    }

    $.ajax({
        async: false,
        url: getAPIUrl('assignment/list'),
        method: 'GET',
        data: {gid: groupId},
        success: response => {
            if(typeof response === 'object') {
                response = response.reverse();
                assignmentList = response;
                let html = "";
                response.forEach(data => {
                    const assignmentUrl = 'gv/group/viewassignment?aid=' + data['id'];

                    html += `
                        <div class="assingment">
                            <a href="${getBaseUrl(assignmentUrl)}" class="assingment-link flex-grow-1">
                                <div class="d-flex ">
                                    <div class="assingment-icon">
                                    <i class="fas fa-clipboard-list"></i>
                                </div>
                                <div class="assingment-info">
                                    <div class="assingment-detail">
                                        <span class="assingment-detail-heading">${data['title']}</span>
                                    </div>
                                    <div class="assingment-time">
                                        <span>${dateFormat(data['postDate'])}</span>
                                    </div>
                                </div>
                                </div>
                            </a>
                            <div class="dropdown-wrapper">
                                <div class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-v fs-4 text"></i></div>
                                    <ul class="dropdown-menu">
                                        <li class="dropdown-item" onclick="viewAssignment(${data['id']});" data-bs-toggle="modal" data-bs-target="#update-assignment">Sửa</li>
                                        <li class="dropdown-item" onclick="getAssignmentId(${data['id']});" data-bs-toggle="modal" data-bs-target="#delete-assignment">Xóa</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    `
                });
                $("#groupContent").html(html);
            }
        }
    })
}

function getAssignmentId(id) {
    assignmentId = id
}

function viewAssignment(id) {
    getAssignmentId(id)
    assignmentList.forEach(assignment => {
        if(assignment['id'] === id) {
            $('#assignmentTitleFix').val(assignment['title'])
            $('#assignmentDesFix').val(assignment['content'])
            $('#assignmentDeadlineFix').val(dateFormat(assignment['deadline'], false, 'en'))
        }
    })
}

// Giao bài tập
function addAssignment() {
    const url = new URL(window.location.href)
    const groupId = url.searchParams.get('gid')
    if(groupId == null) {
        return false
    }
    const title = $("#assignmentTitleAdd").val().trim()
    const des = $("#assignmentDesAdd").val().trim()
    const deadline = $("#assignmentDeadlineAdd").val()

    if (deadline == "") {
        dataForm = { gid: groupId, title: title, content: des };
    } else {
        dataForm = { gid: groupId, title: title, content: des, deadline: deadline };
    }

    $.ajax({
        async: false,
        url: getAPIUrl("assignment/new"),
        method: "POST",
        data: dataForm,
        success: response => {
            if(typeof response === 'object') {
                if(response['success'] == true) {
                    alert('Đã giao bài tập thành công!')
                    getAssignmentList()
                } else {
                    alert('Vui lòng thử lại sau!')
                }
                return false
            }
        }
    })
}

// Cập nhật bài tập
function updateAssignment() {
    const title = $('#assignmentTitleFix').val().trim()
    const des = $('#assignmentDesFix').val().trim()
    const deadline = $('#assignmentDeadlineFix').val().trim()

    if(title == '') {
        alert('Không được để trống tiêu đề')
        return false
    }

    $.ajax({
        async: false,
        url: getAPIUrl(`assignment/update/${assignmentId}`),
        method: "POST",
        data: {title: title, content: des, deadline: deadline},
        success: response => {
            if(typeof response === 'object') {
                if(response['update'] == true) {
                    alert('Đã cập nhật thành công!')
                    getAssignmentList()
                } else {
                    alert('Vui lòng thử lại sau!')
                }
                return false
            }
        }
    })
}

// Xóa bài tập
function removeAssignment() {
    $.ajax({
        async: false,
        url: getAPIUrl(`assignment/remove/${assignmentId}`),
        method: "DELETE",
        success: response => {
            if(typeof response === 'object') {
                if(response['delete'] == true) {
                    alert('Đã xóa bài tập thành công!')
                    getAssignmentList()
                } else {
                    if (response['message'] != "") {
                        alert(response['message']);
                    } else {
                        alert("Vui lòng thử lại sau!");
                    }
                }
                return false
            }
        }
    })
}

/* 
    DETAIL ASSIGNMENT
*/

// Lấy thông tin chi tiết của bài tập
function getDetailAssignment() {
    const url = new URL(window.location.href)
    const assignmentId = url.searchParams.get("aid")
    if(assignmentId == null) {
        return false
    }

    $.ajax({
        async: false,
        url: getAPIUrl(`assignment/infor/${assignmentId}`),
        method: 'GET',
        success: response => {
            if(typeof response === 'object') {
                detailAssisnmentList = response
                $("#nameAssingment").text(response['title'])
                $("#desAssingment").text(response['content'])
                $("#postDate").text(dateFormat(response['postDate']))
                $("#dateline").text(dateFormat(response['deadline']))
                let html = ""
                let i = 0
                response['detail'].forEach(detail => {
                    i++
                    let file = '<a href=""></a>'
                    let score = '<span class="status waiting">Chưa chấm điểm</span>'

                    if(detail['file'] != null) {
                        const groupId = response['gid']
                        const detailId = detail['d_id']
                        const fileName = detail['file']
                        const urlDownload = `group/${groupId}/${assignmentId}/${detailId}/${fileName}`
                        file = `<a href="${getStorageUrl(urlDownload)}" download="${fileName}">${fileName}</a>`
                    }

                    if(detail['score'] != null) {
                        score = '<span class="status approved">Đã chấm điểm</span>'
                    }
                    
                    html += `
                        <tr>
                            <th scope="row">${i}</th> 
                            <td scope="row">${detail['name']}</td>
                            <td scope="row">${file}</td>   
                            <td scope="row">${score}</td>     
                            <td class="assign-action">
                                <div class="text-center">
                                    <button type="button" onclick="viewAssessment(${detail['d_id']});" class="btn btn-secondary table-btn w-100" data-bs-toggle="modal" data-bs-target="#grade-assign">Đánh giá</button>
                                </div>
                            </td>
                        </tr>
                    `
                })
                $("#detailAssisnment").html(html)
            }
        }
    })
}

function getDetailAssisnmentId(id) {
    detailAssisnmentId = id
}

// Xem đánh giá 
function viewAssessment(id) {
    getDetailAssisnmentId(id)
    detailAssisnmentList['detail'].forEach(data => {
        if(data['d_id'] == id) {
            $("#score").val(data['score'])
        }
    })
    getComments()
}

// Chấm điểm
function grade() {
    if(detailAssisnmentId == null) {
        return false
    }

    const id = detailAssisnmentId

    let score = $('#score').val().trim()
    const re = /^[0-9]*$/

    if(score == '') {
        alert('Bạn chưa chấm điểm!')
        return false
    }

    if(!re.test(score)) {
        alert('Điểm phải là số từ 0 - 100')
        return false
    }

    score = parseInt(score)
    if(score < 0 || score > 100) {
        alert('Điểm phải là số từ 0 - 100')
        return false
    }

    $.ajax({
        async: false,
        url: getAPIUrl(`assignment/assess/${id}`),
        method: 'POST',
        data: {score: score},
        success: response => {
            if(typeof response === 'object') {
                if(response['assess'] == true) {
                    alert('Đã chấm điểm thành công!')
                    getDetailAssignment()
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

function getComments() {
    if(detailAssisnmentId == null) {
        return false
    }

    $.ajax({
        url: getAPIUrl(`assignment/opinion/${detailAssisnmentId}`),
        method: 'GET',
        success: response => {
            if(typeof response === 'object') {
                let html = ''
                html += `
                    <label for="" class="form-label">
                        <i class="far fa-comment-alt me-1"></i>
                        Nhận xét
                    </label>
                `
                response.forEach(comment => {
                    let avatarUrl 
                    if(comment['avatar'] == null) {
                        avatarUrl = getImgUrl('user.png')
                    } else {
                        avatarUrl = getStorageUrl(`avatar/${comment['avatar']}`)
                    }

                    html += `
                        <div class="comment-wrapper">
                            <div class="d-flex align-items-center">
                                <div class="cmt-avatar">
                                    <img src="${avatarUrl}" alt="" class="rounded-circle">
                                </div>
                                <h5 class="cmt-user-name mg-0">${comment['name']}</h5>
                                <span class="cmt-time">${dateFormat(comment['time'], true)}</span>
                            </div>
                            <p class="cmt-content mg-0">${comment['content']}</p> 
                        </div>
                    `
                })

                html += `
                    <div class="comment-add">
                        <label for="" class="form-label">
                            <i class="fas fa-comment-medical me-1"></i>
                            Thêm nhận xét
                        </label>
                        <textarea class="form-control" id="formAddOpinion" rows="3"></textarea>
                        <button type="button" onclick="addComments();" class="btn btn-secondary mt-3 mb-3">Gửi</button>
                    </div>
                `
                $("#opinionContent").html(html)
            }
        }
    })
}

// Add Comment
function addComments() {
    if(detailAssisnmentId == null) {
        return false
    }

    const content = $('#formAddOpinion').val().trim()
    if(content == '') {
        alert('Bạn chưa nhập ý kiến!')
        return false
    }

    $.ajax({
        url: getAPIUrl(`assignment/opinion/${detailAssisnmentId}`),
        method: "POST",
        data: { content: content },
        success: response => {
            if (response['opinion'] == true) {
                getComments();
            } else {
                alert("Vui lòng thử lại sau!");
            }
            return false;
        }
    })
}