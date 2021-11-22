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
let subService;
const addSubservice = document.querySelector(".add-subservice");
//   const subject = document.querySelector('#subject');

const subCategories = [
    [
        "Select Tax Servcie",
        "GST Filing",
        "IT Filing",
        "ESI & PF Filing",
        "Individual IT Filing",
        "IT & GST Legal Compliances",
    ],
    [
        "Select Management Service",
        "HT Tool Kit",
        "Employee Engagement",
        "Insurance and Claims",
        "Register Maintainance",
        "RoC Compliances",
    ],
    [
        "Select Accounting Service",
        "Books of Accounts",
        "PayRroll Management",
        "Financial Statements",
        "Vendor and Customer Billing Mangement",
        "IT and Roc Compliances",
    ],
];
form.addEventListener("submit", function (e) {
    e.preventDefault();
    checkInput();
});
service.addEventListener("click", (e) => {
    if (e.target.value === "Tax Services") {
        addSubCategorySelector(0);
    } else if (e.target.value === "Management Services") {
        addSubCategorySelector(1);
    } else if (e.target.value === "Accounting Services") {
        addSubCategorySelector(2);
    } else {
        addSubservice.innerHTML = "";
    }
});
function addSubCategorySelector(idx) {
    let subServiceHtml = `
        <label for="service">${subCategories[idx][0]}</label>
        <select
            id="tax-service"
            class="form-select"
            aria-label="Default select example"
        >
            <option data-service="0" selected disabled>
                ${subCategories[idx][0]}
            </option>
            ${subCategories[idx]
                .map((category, index) => {
                    if (index > 0) {
                        return `
                    <option data-service="${index}" value="${category}">${category}</option>
                    `;
                    }
                })
                .join("")}
        </select>
        <div class="validate"></div>
    `;
    addSubservice.innerHTML = subServiceHtml;
    subService = document.querySelector("#tax-service");
}
function checkInput(e) {
    const usernameValue = username.value;
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const messageValue = message.value.trim();
    const serviceValue = service.value;
    let subServiceValue;
    let isSubservice = false;
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
                        (serviceValue == "Tax Services" ||
                            serviceValue == "Management Services" ||
                            serviceValue == "Accounting Services") &&
                        subService[subService.selectedIndex].dataset.service ==
                            "0"
                    ) {
                        subServiceValue = subService.value;
                        setErrorFor(subService, `Please ${subServiceValue}`);
                    } else {
                        if (subService) {
                            isSubservice = true;
                            setSuccessFor(subService);
                        } else {
                            isSubservice = false;
                        }
                        if (messageValue == "") {
                            setErrorFor(message, "Please Write somthing to us");
                        } else {
                            loader.style.display = "flex";
                            setSuccessFor(message);
                            const selectedService = isSubservice
                                ? `${serviceValue}- ${subServiceValue}`
                                : serviceValue;
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
                                        service: selectedService,
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
