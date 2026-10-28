// Chức năng dùng chung cho các trang hiện có của website.
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

// Hiển thị câu trả lời thực hành ngay trên trang; không gửi hoặc lưu dữ liệu.
const practiceForm = document.querySelector("#practice-form");
const practiceResponse = document.querySelector("#practice-response");
const practiceResult = document.querySelector("#practice-result");

if (practiceForm && practiceResponse && practiceResult) {
  practiceForm.addEventListener("submit", (event) => {
    event.preventDefault();
    practiceResult.textContent = `Bạn sẽ thử nói: “${practiceResponse.value.trim()}” Nội dung này chỉ được xử lý trong trình duyệt, không được gửi đi hoặc lưu lại.`;
    practiceResult.hidden = false;
  });
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
  const symbol = questionButton.querySelector(".faq-symbol");
  if (!symbol) {
    return;
  }

  const answer = document.getElementById(questionButton.getAttribute("aria-controls"));
  const isExpanded = questionButton.getAttribute("aria-expanded") === "true";
  questionButton.setAttribute("aria-expanded", String(!isExpanded));
  answer.hidden = isExpanded;
  symbol.textContent = isExpanded ? "+" : "−";
}

document.querySelectorAll(".faq-question").forEach((questionButton) => {
  if (questionButton.querySelector(".faq-symbol")) {
    questionButton.addEventListener("click", toggleFaqItem);
  }
});



// Ch?c n?ng c?c trang Th?nh vi?n 1.
function chonCamXuc(camxuc) {
    document.getElementById("loikhuyen").style.display = "block";

    if (camxuc == "vui")
    {
        document.getElementById("tenCamXuc").innerHTML = "😊 Bạn đang vui vẻ!";
        document.getElementById("noiDungLoiKhuyen").innerHTML =
            "Hãy tận hưởng niềm vui và chia sẻ năng lượng tích cực với mọi người.";
    }
    else if (camxuc == "buon") {
        document.getElementById("tenCamXuc").innerHTML = "😢 Bạn đang buồn bã.";
        document.getElementById("noiDungLoiKhuyen").innerHTML =
            "Hãy cho bản thân thời gian nghỉ ngơi và tâm sự với người bạn tin tưởng.";
    }
    else if (camxuc == "gian") {
        document.getElementById("tenCamXuc").innerHTML = "😠 Bạn đang tức giận.";
        document.getElementById("noiDungLoiKhuyen").innerHTML =
            "Hãy bình tĩnh, hít thở sâu và nói rõ điều khiến bạn khó chịu.";
    }
    else if (camxuc == "lo") {
        document.getElementById("tenCamXuc").innerHTML = "😟 Bạn đang lo lắng.";
        document.getElementById("noiDungLoiKhuyen").innerHTML =
            "Hãy xác định nguyên nhân và giải quyết từng việc một.";
    }
    else if (camxuc == "met") {
        document.getElementById("tenCamXuc").innerHTML = "😴 Bạn đang mệt mỏi.";
        document.getElementById("noiDungLoiKhuyen").innerHTML =
            "Hãy nghỉ ngơi, uống nước và sắp xếp công việc hợp lý.";
    }
    else if (camxuc == "binhyen") {
        document.getElementById("tenCamXuc").innerHTML = "😌 Bạn đang bình yên.";
        document.getElementById("noiDungLoiKhuyen").innerHTML =
            "Hãy trân trọng cảm giác này và tiếp tục duy trì những thói quen tích cực.";
    }
}

function doiCamXuc() {
    document.getElementById("loikhuyen").style.display = "none";
}





function kiemTraForm() {
    var hoten = document.getElementById("hoten").value;
    var email = document.getElementById("email").value;
    var sdt = document.getElementById("sdt").value;
    var hoatdong = document.getElementById("hoatdong").value;
    var lydo = document.getElementById("lydo").value;

    var nam = document.getElementById("nam").checked;
    var nu = document.getElementById("nu").checked;
    var khac = document.getElementById("khac").checked;

    if (hoten == "" || email == "" || sdt == ""
        || hoatdong == "" || lydo == "") {

        document.getElementById("loiDangKy").innerHTML =
            "Bạn chưa đăng ký thành công. Vui lòng điền đầy đủ thông tin!";

    }
    else if (nam == false && nu == false && khac == false) {

        document.getElementById("loiDangKy").innerHTML =
            "Bạn chưa đăng ký thành công. Vui lòng chọn giới tính!";

    }
    else {
        document.getElementById("loiDangKy").innerHTML = "";
        document.getElementById("formDangKy").style.display = "none";
        document.getElementById("thongbao").style.display = "block";
    }
}



// Ch?c n?ng FAQ v? th? vi?n h?nh ?nh Th?nh vi?n 3.
(()=>{
/* Thành viên 3: FAQ accordion + lọc thư viện và hộp xem ảnh lớn; JS thuần */
'use strict';
// Data is read from semantic page markup; no library or network required.
const faqButtons = Array.from(document.querySelectorAll('.faq-question'));
const faqSearch = document.querySelector('#faq-search');
const faqNoResult = document.querySelector('#faq-empty');
function setFaqOpen(button, isOpen) {
  const panel = document.getElementById(button.getAttribute('aria-controls'));
  if (!panel) return;
  button.setAttribute('aria-expanded', String(isOpen));
  panel.hidden = !isOpen;
  const icon = button.querySelector('.faq-icon');
  if (icon) icon.textContent = isOpen ? '−' : '+';
  // Đồng bộ nhãn nút chung khi mở/đóng một câu riêng.
  const allButton = document.querySelector('#faq-expand');
  if (allButton) allButton.textContent = faqButtons.length > 0 && faqButtons.every(b => b.getAttribute('aria-expanded') === 'true') ? 'Đóng tất cả' : 'Mở tất cả';
}
faqButtons.forEach(button => {
  button.addEventListener('click', () => {
    const next = button.getAttribute('aria-expanded') !== 'true';
    faqButtons.forEach(b => setFaqOpen(b, false));
    setFaqOpen(button, next);
  });
});
const expandBtn = document.querySelector('#faq-expand');
if (expandBtn) expandBtn.addEventListener('click', () => {
  const allOpen = faqButtons.every(b => b.getAttribute('aria-expanded') === 'true');
  faqButtons.forEach(b => setFaqOpen(b, !allOpen));
  expandBtn.textContent = allOpen ? 'Mở tất cả' : 'Đóng tất cả';
});
const normalizeVietnamese = text => text.toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
if (faqSearch) faqSearch.addEventListener('input', () => {
  const query = normalizeVietnamese(faqSearch.value.trim());
  let visible = 0;
  faqButtons.forEach(button => {
    const box = button.closest('.faq-item');
    const found = normalizeVietnamese(box.textContent).includes(query);
    box.classList.toggle('hidden', !found);
    if (found) visible++;
  });
  if (faqNoResult) faqNoResult.hidden = visible !== 0;
});
const filterBtns = Array.from(document.querySelectorAll('[data-filter]'));
const galleryCards = Array.from(document.querySelectorAll('[data-category]'));
filterBtns.forEach(btn => btn.addEventListener('click', () => {
  const filter = btn.dataset.filter;
  filterBtns.forEach(other => other.setAttribute('aria-pressed', String(other === btn)));
  galleryCards.forEach(card => card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter));
}));
const lightbox = document.getElementById('lightbox');
let lastFocused = null;
if (lightbox) {
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const large = lightbox.querySelector('img');
  const caption = lightbox.querySelector('p');
  document.querySelectorAll('.media-button').forEach(button => {
    button.addEventListener('click', () => {
      const small = button.querySelector('img');
      lastFocused = button;
      large.src = small.getAttribute('src');
      large.alt = small.alt;
      caption.textContent = button.closest('figure').querySelector('figcaption strong').textContent;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    });
  });
  function closeLightbox() {
    if (lightbox.hidden) return;
    lightbox.hidden = true;
    large.removeAttribute('src');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'Tab') { e.preventDefault(); closeBtn.focus(); }
  });
}

})();
