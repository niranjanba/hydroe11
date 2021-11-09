const form = document.querySelector(".php-email-form");
const modal = document.querySelector(".bg-modal");
const close = document.querySelector(".close");
const username = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const message = document.querySelector("#message");
const service = document.querySelector("#service");
//   const subject = document.querySelector('#subject');
form.addEventListener("submit", function (e) {
    e.preventDefault();
    checkInput();
});
function checkInput(e) {
    const usernameValue = username.value;
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const messageValue = message.value.trim();
    const serviceValue = service.value;
    // const subjectValue = message.value.trim();

    if (usernameValue == "") {
        setErrorFor(username, "Please Enter a Valid Name");
    } else {
        setSuccessFor(username);
        if (emailValue.length == "" && !emailValue.includes("@")) {
            setErrorFor(email, "Please Enter a Valid Email address");
        } else {
            setSuccessFor(email);
            if (phoneValue.length < 10 && phoneValue == "") {
                setErrorFor(phone, "Please Enter a Valid Mobile Number");
            } else {
                setSuccessFor(phone);
                if (serviceValue == "Open this select menu") {
                    setErrorFor(service, "Please Select a Service");
                } else {
                    console.log(serviceValue);
                    setSuccessFor(service);
                    if (messageValue == "") {
                        setErrorFor(message, "Please Write somthing to us");
                    } else {
                        const formData = new FormData(form);
                        setSuccessFor(message);
                        fetch(form.getAttribute("action"), {
                            method: "POST",
                            headers: {
                                Accept: "application/x-www-form-urlencoded;charset=UTF-8",
                                "Content-Type":
                                    "application/x-www-form-urlencoded;charset=UTF-8",
                            },
                            body: new URLSearchParams(formData).toString(),
                        }).then((res) => {
                            if (res) {
                                console.log(res);
                            }
                        });
                        username.value = "";
                        email.value = "";
                        phone.value = "";
                        message.value = "";
                        modal.style.display = "flex";
                        // modal.style.height = `${document.documentElement.scrollHeight}px`;
                    }
                }
            }
        }
    }
}
function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const errMsg = formControl.querySelector(".validate");
    errMsg.style.display = "block";

    errMsg.innerHTML = message;
}
function setSuccessFor(input) {
    const formControl = input.parentElement;
    const errMsg = formControl.querySelector(".validate");
    errMsg.style.display = "none";
}
close.addEventListener("click", function () {
    modal.style.display = "none";
});
