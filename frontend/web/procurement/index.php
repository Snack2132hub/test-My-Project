<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>โรงพยาบาลปากช่องนานา</title>
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
    background-color: #1e90ff;
    color: white;
  }
  div.size {
    font-size: 18px;
  }
</style>

<main id="main" class="main">
  <section class="section dashboard">
    <div class="row">

      <!-- Left side columns -->
      <div class="col-lg-12">
        <div class="row">

          <!-- Reports -->
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <br>

                <!-- Slides with controls -->
                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img src="assets/img/slider1.jpg" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                      <img src="assets/img/slider2.jpg" class="d-block w-100" alt="...">
                    </div>
                  </div>

                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>

                </div><!-- End Slides with controls -->
              </div>

            </div>
          </div><!-- End Reports -->

          <!-- Sales Card -->
          <div class="col-xxl-4 col-md-6">
            <div class="card info-card sales-card bg-info">
              <div class="card-body">
                <h5 class="card-title"></h5>
                <div class="d-flex align-items-center ">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i class="bi bi-megaphone"></i>
                  </div>
                  <div class="ps-3">
                    <h6><a href="recruitment.php" class="text-black">ประกาศรับสมัครงาน</a></h6>
                  </div>
                </div>
              </div>
            </div>
          </div><!-- End Sales Card -->

          <!-- Revenue Card -->
          <div class="col-xxl-4 col-md-6">
            <div class="card info-card revenue-card bg-success">
              <div class="card-body">
                <h5 class="card-title"></h5>
                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i class="bi bi-card-checklist"></i>
                  </div>
                  <div class="ps-3">
                    <h6><a href="Announcement.php" class="text-black">ผู้มีสิทธิเข้าสอบและสอบสัมภาษณ์</a></h6>
                  </div>
                </div>
              </div>
            </div>
          </div><!-- End Revenue Card -->

          <!-- Customers Card -->
          <div class="col-xxl-4 col-xl-12">
            <div class="card info-card customers-card bg-warning">
              <div class="card-body">
                <h5 class="card-title"></h5>
                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i class="bi bi-newspaper"></i>
                  </div>
                  <div class="ps-3">
                    <h6><a href="qualified.php" class="text-black">ประกาศรายชื่อผู้ผ่านการคัดเลือก</a></h6>
                  </div>
                </div>
              </div>
            </div>
          </div><!-- End Customers Card -->

        </div>
      </div><!-- End Left side columns -->

      <section class="section">
        <div class="row">
          <div class="col-lg-12">

            <div class="card size">
              <div class="card-body">
                <br>
                <h3>ประกาศรับสมัครงาน</h3>
                
                <table class="table datatable" id="customers">
                  <thead>
                    <tr>
                      <th scope="col"><center>ลำดับ</center></th>
                      <th scope="col">ตำแหน่ง</th>
                      <th scope="col">อัตรา</th>
                      <th scope="col">ระดับการศึกษา</th>
                      <th scope="col">หน่วยงาน</th>
                      <th scope="col">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><center>1</center></td>
                      <td><a href="#" class="text-primary">นักทรัพยากรบุคคล(งานสร้างเสริมศักยภาพและพัฒนาบุคลากร)</a></td>
                      <td>1 อัตรา</a></td>
                      <td>ปริญญาตรีขึ้นไป</td>
                      <td>โรงพยาบาลปากช่องนานา
                        <br>
                        ปฏิบัติงาน : ฝ่ายทรัพยากรบุคคล
                      </td>
                      <td><span class="badge bg-danger"><i class="bi bi-star-fill"></i> New</span></td>
                    </tr>
                    <tr>
                      <td><center>2</center></td>
                      <td><a href="#" class="text-primary">นักทรัพยากรบุคคล(งานสร้างเสริมศักยภาพและพัฒนาบุคลากร)</a></td>
                      <td>1 อัตรา</a></td>
                      <td>ปริญญาตรีขึ้นไป</td>
                      <td>โรงพยาบาลปากช่องนานา
                        <br>
                        ปฏิบัติงาน : ฝ่ายทรัพยากรบุคคล
                      </td>
                      <td><span class="badge bg-danger"><i class="bi bi-star-fill"></i> New</span></td>
                    </tr>
                    <tr>
                      <td><center>3</center></td>
                      <td><a href="#" class="text-primary">นักทรัพยากรบุคคล(งานสร้างเสริมศักยภาพและพัฒนาบุคลากร)</a></td>
                      <td>1 อัตรา</a></td>
                      <td>ปริญญาตรีขึ้นไป</td>
                      <td>โรงพยาบาลปากช่องนานา
                        <br>
                        ปฏิบัติงาน : ฝ่ายทรัพยากรบุคคล
                      </td>
                      <td><span class="badge bg-danger"><i class="bi bi-star-fill"></i> New</span></td>
                    </tr>
                    <tr>
                      <td><center>4</center></td>
                      <td><a href="#" class="text-primar">นักทรัพยากรบุคคล(งานสร้างเสริมศักยภาพและพัฒนาบุคลากร)</a></td>
                      <td>1 อัตรา</a></td>
                      <td>ปริญญาตรีขึ้นไป</td>
                      <td>โรงพยาบาลปากช่องนานา
                        <br>
                        ปฏิบัติงาน : ฝ่ายทรัพยากรบุคคล
                      </td>
                      <td><span class="badge bg-danger"><i class="bi bi-star-fill"></i> New</span></td>
                    </tr>
                    <tr>
                      <td><center>5</center></td>
                      <td><a href="#" class="text-primary">นักทรัพยากรบุคคล(งานสร้างเสริมศักยภาพและพัฒนาบุคลากร)</a></td>
                      <td>1 อัตรา</a></td>
                      <td>ปริญญาตรีขึ้นไป</td>
                      <td>โรงพยาบาลปากช่องนานา
                        <br>
                        ปฏิบัติงาน : ฝ่ายทรัพยากรบุคคล
                      </td>
                      <td><span class="badge bg-danger"><i class="bi bi-star-fill"></i> New</span></td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  </section>

</main><!-- End #main -->

<!-- ======= Footer ======= -->
<footer id="footer" class="footer">
  <div class="copyright">
    &copy; Copyright <strong><span>โรงพยาบาลปากช่องนานา</span></strong>. All Rights Reserved
  </div>
</footer><!-- End Footer -->

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

</html> -->
