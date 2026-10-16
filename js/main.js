// Chức năng dùng chung cho dashboard và chín trang nội dung của ba thành viên.
// Dữ liệu phản hồi cho các value trong danh sách chọn ở communication_scenarios.html.
const situations = {
  "group-work": {
    response: "Mình lo nhóm không kịp hoàn thành. Bạn có thể gửi phần của mình trước tối nay không?",
    reminder: "Nói rõ mối lo và đưa ra một đề nghị cụ thể."
  },
  misunderstanding: {
    response: "Có thể tin nhắn của mình chưa rõ. Ý mình là… Bạn hiểu thế nào để mình nói lại nhé?",
    reminder: "Kiểm tra cách hiểu trước khi kết luận người kia cố ý."
  },
  chores: {
    response: "Mình thấy việc dọn đang chưa chia đều. Mình cùng thống nhất lịch phù hợp cho cả hai nhé?",
    reminder: "Chuyển lời phàn nàn thành lời mời cùng tìm giải pháp."
  }
};

// Lấy điều khiển đầu vào và vùng kết quả để gắn sự kiện DOM.
const situationSelect = document.querySelector("#situation-select");
const responseResult = document.querySelector("#response-result");

// Hiển thị gợi ý tương ứng; tạo node và dùng textContent để nội dung không được diễn giải thành HTML.
function renderSituationResponse() {
  const selectedSituation = situations[situationSelect.value];
  responseResult.replaceChildren();

  const label = document.createElement("span");
  label.className = "response-label";
  label.textContent = "GỢI Ý PHẢN HỒI";
  responseResult.append(label);

  const response = document.createElement("p");
  if (selectedSituation) {
    response.textContent = `“${selectedSituation.response}”`;
    responseResult.append(response);

    const reminder = document.createElement("p");
    reminder.className = "response-reminder";
    reminder.textContent = selectedSituation.reminder;
    responseResult.append(reminder);
  } else {
    response.className = "response-placeholder";
    response.textContent = "Chọn một tình huống phía trên để xem gợi ý phản hồi.";
    responseResult.append(response);
  }
}

// Chỉ gắn sự kiện khi trang hiện tại có đủ hai phần tử của chức năng.
if (situationSelect && responseResult) {
  situationSelect.addEventListener("change", renderSituationResponse);
}

// Mở/đóng điều hướng trên màn hình nhỏ và đồng bộ trạng thái trợ năng aria-expanded.
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

function toggleMobileNavigation() {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  siteNav.classList.toggle("is-open", !isExpanded);
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", toggleMobileNavigation);
}

// Kiểm tra biểu mẫu mô phỏng, hiện lỗi theo từng trường và không gửi dữ liệu đi.
const experienceForm = document.querySelector("#experience-form");

function handleExperienceFormSubmit(event) {
  event.preventDefault();

  const fieldErrors = {
    "participant-name": document.querySelector("#name-error"),
    "participant-email": document.querySelector("#email-error"),
    "participant-role": document.querySelector("#role-error"),
    session: document.querySelector("#session-error"),
    "participant-expectation": document.querySelector("#expectation-error")
  };
  const errorSummary = document.querySelector("#form-error-summary");
  const resultPanel = document.querySelector("#form-result");
  const nameField = document.querySelector("#participant-name");
  const emailField = document.querySelector("#participant-email");
  const roleField = document.querySelector("#participant-role");
  const expectationField = document.querySelector("#participant-expectation");
  const sessionField = experienceForm.querySelector('input[name="session"]:checked');

  Object.values(fieldErrors).forEach((errorElement) => {
    errorElement.textContent = "";
  });
  experienceForm.querySelectorAll("[aria-invalid='true']").forEach((field) => {
    field.removeAttribute("aria-invalid");
  });
  errorSummary.textContent = "";
  resultPanel.hidden = true;

  const errors = [];
  const setFieldError = (field, errorElement, message) => {
    errorElement.textContent = message;
    field.setAttribute("aria-invalid", "true");
    errors.push({ field, message });
  };

  if (!nameField.value.trim()) {
    setFieldError(nameField, fieldErrors["participant-name"], "Vui lòng nhập họ và tên.");
  }

  const emailValue = emailField.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailValue) {
    setFieldError(emailField, fieldErrors["participant-email"], "Vui lòng nhập email.");
  } else if (!emailPattern.test(emailValue)) {
    setFieldError(emailField, fieldErrors["participant-email"], "Email chưa đúng định dạng, ví dụ ten@example.com.");
  }

  if (!roleField.value) {
    setFieldError(roleField, fieldErrors["participant-role"], "Vui lòng chọn vai trò tham gia.");
  }

  if (!sessionField) {
    const firstSessionOption = experienceForm.querySelector('input[name="session"]');
    setFieldError(firstSessionOption, fieldErrors.session, "Vui lòng chọn một khung giờ.");
  }

  const expectationValue = expectationField.value.trim();
  if (expectationValue.length < 5) {
    setFieldError(expectationField, fieldErrors["participant-expectation"], "Vui lòng nhập ít nhất 5 ký tự về điều bạn muốn thực hành.");
  }

  if (errors.length > 0) {
    errorSummary.textContent = `Có ${errors.length} mục cần kiểm tra. Lỗi cụ thể được ghi dưới từng trường.`;
    errors[0].field.focus();
    return;
  }

  const roleLabel = roleField.selectedOptions[0].textContent;
  const sessionLabel = sessionField.value === "morning" ? "Buổi sáng" : "Buổi chiều";
  const summaryTitle = document.createElement("h3");
  summaryTitle.textContent = "Thông tin đã được kiểm tra";
  const summaryItems = [
    `Tên: ${nameField.value.trim()}`,
    `Email: ${emailValue}`,
    `Vai trò: ${roleLabel}`,
    `Khung giờ mong muốn: ${sessionLabel}`,
    `Nội dung muốn thực hành: ${expectationValue}`
  ];
  const summaryList = document.createElement("ul");
  summaryItems.forEach((summaryItem) => {
    const listItem = document.createElement("li");
    listItem.textContent = summaryItem;
    summaryList.append(listItem);
  });
  const simulationNote = document.createElement("p");
  simulationNote.textContent = "Đây chỉ là tóm tắt mô phỏng trong trình duyệt; không có dữ liệu nào được gửi hoặc lưu.";
  resultPanel.replaceChildren(summaryTitle, summaryList, simulationNote);
  resultPanel.hidden = false;
  resultPanel.focus();
}

if (experienceForm) {
  experienceForm.addEventListener("submit", handleExperienceFormSubmit);
}

// Mở/đóng câu trả lời FAQ và đồng bộ aria-expanded cùng biểu tượng dấu cộng/trừ.
function toggleFaqItem(event) {
  const questionButton = event.currentTarget;
  const answer = document.getElementById(questionButton.getAttribute("aria-controls"));
  const isExpanded = questionButton.getAttribute("aria-expanded") === "true";
  questionButton.setAttribute("aria-expanded", String(!isExpanded));
  answer.hidden = isExpanded;
  questionButton.querySelector(".faq-symbol").textContent = isExpanded ? "+" : "−";
}

document.querySelectorAll(".faq-question").forEach((questionButton) => {
  questionButton.addEventListener("click", toggleFaqItem);
});
