import { ReportData } from "./report-types";
import fs from "fs";
import path from "path";
const logoPath = path.join(
    process.cwd(),
    "public",
    "images",
    "logo.png"
);

const logoBase64 = fs.readFileSync(logoPath).toString("base64");

export function reportTemplate(data: ReportData) {

    return `
<!DOCTYPE html>

<html lang="ar" dir="rtl">

<head>

<meta charset="UTF-8">

<style>

<>
    * {
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family:'Cairo', sans-serif;
    }

        body
        html {
        font-family: "Cairo", sans-serif;
direction:rtl;
padding:20px;
background:white;
color:#222;
}

.header{
text-align:center;
margin-bottom:35px;
}

.header h1{
font-size:34px;
margin-bottom:10px;
color:#0f172a;
}

.header h3{
font-size:18px;
font-weight:500;
color:#64748b;
}

.info{
display:grid;
grid-template-columns:repeat(2,1fr);
gap:15px;
margin-bottom:30px;
margin-top:20px;
}

.card {
  border: 1px solid #E5E7EB;
  padding: 18px;
  border-radius: 10px;
  background: #FAFAFA;
}

.card-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 8px;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
}

.card-label svg {
  flex-shrink: 0;
}

.card-value {
  color: #111827;
  font-size: 16px;
  font-weight: 700;
}

.stats{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:15px;
margin-bottom:35px;
}

.stats .stat{
padding:18px;
border-radius:10px;
text-align:center;
background:#f8fafc;
border:1px solid #ddd;
}

.stats .stat h2{
font-size:32px;
margin-bottom:10px;
}


table{
width:100%;
border-collapse:collapse;
margin-top:20px;
}

thead{
background:#0f172a;
color:white;
}

th,
td{
border:1px solid #ddd;
padding:8px;
text-align:center;
}

tbody tr:nth-child(even){
background:#f8fafc;
}

.footer{
margin-top:40px;
text-align:center;
font-size:14px;
color:#888;
}

@media (max-width: 600px) {
.header-images {
    flex-direction: column;
    align-items: center;
}
}

.first-page{
    height:100%;
}


.page-break{
    page-break-before:always;
}

.header-images {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 50px;
    margin-bottom: 150px;
}

.logo-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
}

.invitation-frame {
    background: #ffffff;
    padding: 14px;
    border-radius: 6px;
    border: 1px solid #c6a15b;
    box-shadow: 0 8px 24px rgba(14, 59, 46, 0.12);
    width: 250px;
}

.invitation {
    background: #ffffff;
    padding: 8px;
    border: 1px solid #e8e4d9;
    border-radius: 3px;
    overflow: hidden;
}

.invitation-img {
    width: 100%;
    display: block;
    border-radius: 2px;
}

h1{
    text-align:center;
    font-size:34px;
}

h3{

    text-align:center;

    font-size:22px;

    color:#475569;

    margin-bottom:30px;

}


</style>

</head>

<body>
<div class="first-page">


<div class="header-images">

    <div class="logo">
        <img
            src="data:image/png;base64,${logoBase64}"
            class="logo-img"
        />
    </div>

    <div class="invitation-frame">
        <div class="invitation">
        ${data.invitation_image
            ? `<img src="${data.invitation_image}" class="invitation-img" />`
            : `<div class="invitation-placeholder">لا توجد صورة</div>`
        }
        </div>
    </div>

</div>



<h1>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C084FC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-party-popper preview-icon"><path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/></svg> تقرير المناسبة
</h1>


<h3>
${data.title}
</h3>



<div class="info">


<div class="card">

  <p class="card-label">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4AF7A"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>

    <span>اسم العميل</span>
  </p>

  <div class="card-value">
    ${data.client.name}
  </div>

</div>



<div class="card">
  <p class="card-label">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#B8894A"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M8 2v3"/>
      <path d="M16 2v3"/>
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18"/>
      <path d="M8 13h.01"/>
      <path d="M12 13h.01"/>
      <path d="M16 13h.01"/>
      <path d="M8 17h.01"/>
      <path d="M12 17h.01"/>
      <path d="M16 17h.01"/>
    </svg>

    <span>تاريخ التقرير</span>
  </p>

  <div class="card-value">
    ${new Date().toLocaleDateString("ar-EG")}
  </div>
</div>

<div class="stats">

<div class="stat">
<h2>
${data.guests.length}
</h2>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users preview-icon"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg> إجمالي المعازيم
</div>

<div class="stat">
<h2>
${data.attended}
</h2>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check preview-icon"><path d="M20 6 9 17l-5-5"/></svg> الحضور
</div>

<div class="stat">
<h2>
${data.declined}
</h2>
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#DC2626"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10"/>
  <path d="m15 9-6 6"/>
  <path d="m9 9 6 6"/>
</svg> لم يحضر
</div>

<div class="stat">
<h2>
${data.pending}
</h2>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF7A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hourglass preview-icon"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg> بانتظار الرد
</div>

</div>

<div class="page-break"></div>

<div class="guests-page">

<h2>
<h2 class="section-title">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#7C5C2E"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <rect width="8" height="4" x="8" y="2" rx="1"/>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <path d="M12 11h4"/>
    <path d="M12 16h4"/>
    <path d="M8 11h.01"/>
    <path d="M8 16h.01"/>
  </svg>

  قائمة المعازيم
</h2>
<table>

<thead>

<tr>

<th>كود الدعوة</th>
<th>الاسم</th>
<th>الهاتف</th>
<th>الحالة</th>
<th>الدعوة عبر الوتساب</th>
<th>تأكيد الدخول</th>
<th>طريقة الدخول</th>
<th>وقت الدخول</th>

</tr>

</thead>

<tbody>

${data.guests.map((guest) => `

<tr key={guest.id}>

<td>${guest.guest_code}</td>

<td>${guest.name}</td>

<td>${guest.phone}</td>

<td>

${guest.status === "pending"
                ? `<span>بانتظار الرد</span>`
                : guest.status === "attending"
                    ? `<span>سيحضر</span>`
                    : `<span>اعتذر</span>`
            }
</td>

<td>${guest.invitation_sent ? "تم الأرسال" : "لم ترسل"}</td>

<td>${guest.attend_confirmation ? "✔" : " "}</td>
<td>${guest.method ? guest.method === "qr" ? "QR" : "يدوى" : " "}</td>
<td>${guest.scanned_at ? new Date(guest.scanned_at).toLocaleString("ar-EG") : " "}</td>
</tr>

`).join("")}
</tbody>

</table>

<div class="footer">

تم إنشاء التقرير تلقائياً بواسطة نظام الدعوات الإلكترونية

</div>

</body>
</div>

</html>

`;

}