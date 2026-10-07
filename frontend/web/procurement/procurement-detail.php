<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>จัดซื้อ - จัดจ้าง</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="assets/img/icon.png" rel="icon">
  <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Mitr:wght@200;300&display=swap" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
  <link href="assets/vendor/quill/quill.snow.css" rel="stylesheet">
  <link href="assets/vendor/quill/quill.bubble.css" rel="stylesheet">
  <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet">
  <link href="assets/vendor/simple-datatables/style.css" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="assets/css/style.css" rel="stylesheet">

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

</head>

<body>

  <!-- ======= Header ======= -->
  <?php include('header.php');?>
  <!-- End Header -->

  <!-- ======= Sidebar ======= -->
  <?php include('sidebar.php');?>
  <!-- End Sidebar-->

  <main id="main" class="main">

    <style>
    #customers td, #customers th {
      border: 1px solid #EDEDED;
      padding: 8px;
    }

    #customers tr:nth-child(even){background-color: #F9F9F9;}

    #customers tr:hover {background-color: #F1F1F1;}

    #customers th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #ff8c00;
      color: white;
      font-size: 18px;
    }
    div.size {
      font-size: 18px;
    }
    </style>

    <div class="pagetitle">
      <h1>ประกวดราคา จัดซื้อจัดจ้าง</h1>
      <br>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.php">หน้าหลัก</a></li>
          <li class="breadcrumb-item"><a href="procurement.php">จัดซื้อ-จัดจ้าง</a></li>
        </ol>
      </nav>
    </div><!-- End Breadcrumbs with a page title -->

    <br>
    <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <div class="card size">
            <div class="card-body">
              <div class="card-header"><i class="bi bi-bookmark-fill"></i><font color="#FF7000"> ประกาศผลการประกวดราคาจ้างก่อสร้างอาคารศูนย์สุขภาพชุมชนเมือง ๔ ชั้น เป็นอาคาร คสล. ๔ ชั้น พื้นที่ใช้สอยประมาณ ๒,๑๗๐ ตารางเมตร โรงพยาบาลปากช่องนานา</font></div>
              <div class="card-body">
                <br>
                จังหวัดนครราชสีมา โดย สำนักงานสาธารณสุขจังหวัดนครราชสีมา ขอประกาศผลการประกวดราคาจ้างก่อสร้างอาคารศูนย์สุขภาพชุมชนเมือง ๔ ชั้น เป็นอาคาร คสล. ๔ ชั้น
                พื้นที่ใช้สอยประมาณ ๒,๑๗๐ ตารางเมตร โรงพยาบาลส่งเสริมสุขภาพตำบลศรีษะละเลิง ตำบลบ้านใหม่ อำเภอเมืองนครราชสีมา จังหวัดนครราชสีมา ๑ หลัง
                ด้วยวิธีประกวดราคาอิเล็กทรอนิกส์ (e-bidding) ตามเอกสารประกวดราคาจ้างเลขที่ ๑/๒๕๖๖ ลงวันที่  ๒๖ มกราคม ๒๕๖๖ ดังรายละเอียดที่แนบมาพร้อมนี้
              </div>
              <div class="card-footer">ไฟล์แนบ : <i class="bi bi-file-pdf-fill"></i>
                <a href="pdf/test.pdf" ><font color="red">ประกาศผู้ชนะการเสนอราคา ก่อสร้างอาคารศูนย์สุขภาพโรงพยาบาลปากช่องนานา</font> </a>
              </div>

              <div align="right">
                <div class="card-footer">
                  <i class="bi bi-megaphone"></i> : หน่วยงานพัสดุ รพ.ปากช่องนานา
                  <br>
                  <i class="bi bi-telephone"></i> : 044-311856 ต่อ 407
                  <br>
                  <i class="bi bi-calendar"></i> : 30 มีนาคม 2566
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

  </main><!-- End #main -->


  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Vendor JS Files -->
  <script src="assets/vendor/apexcharts/apexcharts.min.js"></script>
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/chart.js/chart.min.js"></script>
  <script src="assets/vendor/echarts/echarts.min.js"></script>
  <script src="assets/vendor/quill/quill.min.js"></script>
  <script src="assets/vendor/simple-datatables/simple-datatables.js"></script>
  <script src="assets/vendor/tinymce/tinymce.min.js"></script>
  <script src="assets/vendor/php-email-form/validate.js"></script>

  <!-- Template Main JS File -->
  <script src="assets/js/main.js"></script>

</body>

</html>
