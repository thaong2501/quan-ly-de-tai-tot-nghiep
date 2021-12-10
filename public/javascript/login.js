$(document).ready(function() {
    //Xử lý đăng nhập
    $("#login").submit(function(evt) {
        evt.preventDefault();
        let username = $("#username").val();
        let password = $("#password").val();

        if (username == "") {
            alert("Tên đăng nhập không được để trống");
            return false;
        }
        if (password == "") {
            alert("Mật khẩu không được để trống");
            return false;
        }

        // gọi Ajax
        $.ajax({
            async: false,
            url: getAPIUrl("users/login"),
            method: "POST",
            data: { username: username, password: password },
            success: function(response) {
                if (response['login']) {
                    window.location = getBaseUrl('home');
                } else {
                    alert("Tài khoản mật khẩu không chính xác");
                    return false;
                }
            }
        });
    });
});


// const submit = document.querySelector('#submit');
// const loginApi = getAPIUrl("users/login");

// submit.onclick = () => {
//     const username = document.querySelector('#username').value;
//     const password = document.querySelector('#password').value;

//     if(username === '') {
//         alert("Tên đăng nhập không được để trống!");
//     }
//     else if(password === '') {
//         alert("Mật khẩu không được để trống!");
//     }

//     const data = {
//         username: username,
//         password: password
//     }

//     fetch(loginApi, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             console.log('Success:', data);
//         })
//         .catch((error) => {
//             console.log('Error:', error);
//         });

// }



