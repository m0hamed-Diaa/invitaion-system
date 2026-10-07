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

@font-face {
  font-family: "Cairo";

  src: url("file://${process.cwd()}/public/fonts/Cairo-VariableFont_slnt,wght.ttf");

  font-weight: 400;
}

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Cairo', sans-serif;
}

body{
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

.card{
border:1px solid #ddd;
padding:18px;
border-radius:10px;
background:#fafafa;
}

.card b{
display:block;
margin-bottom:5px;
}

.stats{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:15px;
margin-bottom:35px;
}

.stat{
padding:18px;
border-radius:10px;
text-align:center;
background:#f8fafc;
border:1px solid #ddd;
}

.stat h2{
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
📋 تقرير المناسبة
</h1>


<h3>
${data.title}
</h3>



<div class="info">


<div class="card">

<b>👤 اسم العميل</b>

${data.client.name}

</div>



<div class="card">

<b>📅 تاريخ التقرير</b>

${new Date().toLocaleDateString("ar-EG")}

</div>


</div>



<div class="stats">


<div class="stat">

<h2>
${data.guests.length}
</h2>

📋 إجمالي المعازيم

</div>



<div class="stat">

<h2>
${data.attended}
</h2>

✅ الحضور

</div>



<div class="stat">

<h2>
${data.declined}
</h2>

❌ اعتذر

</div>



<div class="stat">

<h2>
${data.pending}
</h2>

⏳ لم يرد

</div>
</div>
</div>

<div class="page-break"></div>

<div class="guests-page">

<h2>
📋 قائمة المعازيم
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