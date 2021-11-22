const form = document.querySelector(".php-email-form");
const modal = document.querySelector(".bg-modal");
const close = document.querySelector(".close");
const username = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const message = document.querySelector("#message");
const service = document.querySelector("#service");
const loader = document.querySelector(".loader-background");
const subTax = document.querySelector(".sub-tax");
const taxSubService = document.querySelector("#tax-service");
//   const subject = document.querySelector('#subject');
form.addEventListener("submit", function (e) {
    e.preventDefault();
    checkInput();
});
service.addEventListener("click", (e) => {
    if (e.target.value === "Tax Services") {
        subTax.style.display = "block";
    } else {
        subTax.style.display = "none";
    }
});
function checkInput(e) {
    const usernameValue = username.value;
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const messageValue = message.value.trim();
    const serviceValue = service.value;
    const taxSubServeValue = taxSubService.value;
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
                if (serviceValue == "Select Service") {
                    setErrorFor(service, "Please Select a Service");
                } else {
                    setSuccessFor(service);
                    if (
                        serviceValue === "Tax Services" &&
                        taxSubServeValue == "Select Tax Service"
                    ) {
                        setErrorFor(
                            taxSubService,
                            "Please Select a Tax Service"
                        );
                    } else {
                        setSuccessFor(taxSubService);
                        if (messageValue == "") {
                            setErrorFor(message, "Please Write somthing to us");
                        } else {
                            loader.style.display = "flex";
                            setSuccessFor(message);
                            const selectedService =
                                serviceValue == "Tax Services"
                                    ? `${serviceValue}- ${taxSubServeValue}`
                                    : serviceValue;
                            console.log(selectedService);
                            let headers = new Headers();
                            headers.append("Content-Type", "application/json");
                            headers.append("Accept", "application/json");
                            fetch(
                                "https://mycorsproxy-niranjan.herokuapp.com/https://hydro-mailer.herokuapp.com/api/v1/mail",
                                {
                                    method: "POST",
                                    headers: headers,
                                    body: JSON.stringify({
                                        name: usernameValue,
                                        email: emailValue,
                                        phone: phoneValue,
                                        message: messageValue,
                                        service: serviceValue,
                                    }),
                                }
                            )
                                .then((res) => {
                                    if (res.ok) {
                                        modal.style.display = "flex";
                                        loader.style.display = "none";
                                        console.log(res);
                                    } else {
                                        throw new Error(
                                            "Could'nt send the mail try after some time"
                                        );
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                    loader.style.display = "none";
                                });
                            username.value = "";
                            email.value = "";
                            phone.value = "";
                            message.value = "";
                            // modal.style.height = `${document.documentElement.scrollHeight}px`;
                        }
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
