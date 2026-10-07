<!DOCTYPE html>
<html lang="en">
<?php 
date_default_timezone_set("Asia/Bangkok");
$thai_day_arr=array("อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์");
$thai_month_arr=array(
	"0"=>"",
	"1"=>"มกราคม",
	"2"=>"กุมภาพันธ์",
	"3"=>"มีนาคม",
	"4"=>"เมษายน",
	"5"=>"พฤษภาคม",
	"6"=>"มิถุนายน",
	"7"=>"กรกฎาคม",
	"8"=>"สิงหาคม",
	"9"=>"กันยายน",
	"10"=>"ตุลาคม",
	"11"=>"พฤศจิกายน",
	"12"=>"ธันวาคม"
);
$thai_month_arr2=array(
	"0"=>"",
	"1"=>"01",
	"2"=>"02",
	"3"=>"03",
	"4"=>"04",
	"5"=>"05",
	"6"=>"06",
	"7"=>"07",
	"8"=>"08",
	"9"=>"09",
	"10"=>"10",
	"11"=>"11",
	"12"=>"12"
);
function thai_date2($time){
	global $thai_day_arr,$thai_month_arr;
	// $thai_date_return="วัน".$thai_day_arr[date("w",$time)];
	$thai_date_return.= date("j",$time);
	$thai_date_return.=" ".$thai_month_arr[date("n",$time)];
	$thai_date_return.= " ".(date("Yํ",$time)+543);
	return $thai_date_return;
}
function thai_date($time){
	global $thai_day_arr,$thai_month_arr2;
	// $thai_date_return="วัน".$thai_day_arr[date("w",$time)];
	$thai_date_return.= date("j",$time);
	$thai_date_return.="/".$thai_month_arr2[date("n",$time)];
	$thai_date_return.= "/".(date("Yํ",$time)+543);
	return $thai_date_return;
}
?>
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
      font-size: 16px;
    }
    div.size {
      font-size: 16px;
    }

    </style>

    <div class="pagetitle">
      <h1>ประกวดราคา จัดซื้อ-จัดจ้าง</h1>
    </div><!-- End Page Title -->
    <br>
    <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <div class="card size">
            <div class="card-body">
              <h5 class="card-title"></h5>

              <!-- Table with stripped rows -->
              <table class="table datatable" id="customers">
                <thead>
                  <tr>
                    <th scope="col">ข่าวประกวดราคา จัดซื้อ จัดจ้าง</th>

                  </tr>
                </thead>
                <tbody>
                  <?php 
                  require_once __DIR__ . '/db.php';
                  $q = $pdo->query("SELECT * FROM purchase ORDER BY purchase_id DESC");
                  while($a = $q->fetch()){
                    $dd = $a['date_news'];
                    $date_1=strtotime("$dd");
                    $d = thai_date2($date_1);
                  ?>
                  <tr>
                    <td><div class="row">
                      <div class="col-lg-12">
                        <div class="card size">
                          <div class="card-body">
                            <div class="card-header"><i class="bi bi-bookmark-fill"></i><font color="#FF7000"> <?php echo $a['news_h'];?></font></div>
                            <div class="card-body">
                              <br>
                              <div class="col-sm-12">
                                <textarea rows="12" class="form-control no-resize" disabled><?php echo $a['news_detail'];?></textarea>
                              </div>
                              
                            </div>
                            <?php if($a['h_file1'] != ""){?>
                            <div class="card-footer">ไฟล์แนบ : <i class="bi bi-file-pdf-fill"></i>
                              <a href="<?php echo "../../".$a['file1'];?>" ><font color="red"><?php echo $a['h_file1'];?></font> </a>
                            </div>
                            <?php } if($a['h_file2'] != ""){?>
                              <div class="card-footer">ไฟล์แนบ : <i class="bi bi-file-pdf-fill"></i>
                              <a href="<?php echo "../../".$a['file2'];?>" ><font color="red"><?php echo $a['h_file2'];?></font> </a>
                            </div>
                            <?php } if($a['h_file3'] != ""){?>
                              <div class="card-footer">ไฟล์แนบ : <i class="bi bi-file-pdf-fill"></i>
                              <a href="<?php echo "../../".$a['file2'];?>" ><font color="red"><?php echo $a['h_file3'];?></font> </a>
                            </div>
                            <?php } if($a['h_file4'] != ""){?>
                              <div class="card-footer">ไฟล์แนบ : <i class="bi bi-file-pdf-fill"></i>
                              <a href="<?php echo "../../".$a['file4'];?>" ><font color="red"><?php echo $a['h_file4'];?></font> </a>
                            </div>
                            <?php } if($a['h_file5'] != ""){?>
                              <div class="card-footer">ไฟล์แนบ : <i class="bi bi-file-pdf-fill"></i>
                              <a href="<?php echo "../../".$a['file5'];?>" ><font color="red"><?php echo $a['h_file5'];?></font> </a>
                            </div>
                            <?php }?>
                            <div align="right">
                              <div class="card-footer">
                                <i class="bi bi-megaphone"></i> : หน่วยงานพัสดุ รพ.ปากช่องนานา
                                <br>
                                <i class="bi bi-telephone"></i> : 044-311856 ต่อ 407
                                <br>
                                <i class="bi bi-calendar"></i> : <?php echo $d;?>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div></td>
                  </tr>
                  <?php }?>
                </tbody>
              </table>
              <!-- End Table with stripped rows -->
            </div>
          </div>

        </div>
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

</html>
