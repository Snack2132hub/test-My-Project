<style>
  #customers td,
  #customers th {
    border: 1px solid #EDEDED;
    padding: 8px;
  }

  #customers tr:nth-child(even) {
    background-color: #F9F9F9;
  }

  #customers tr:hover {
    background-color: #F1F1F1;
  }

  #customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #1e90ff;
    color: white;
    font-size: 18px;
  }

  div.size {
    font-size: 18px;
  }
</style>

<aside id="sidebar" class="sidebar">
  <ul class="sidebar-nav" id="sidebar-nav">

    <li class="nav-item">
      <a class="nav-link " href="https://pnnh.go.th/pcnana/">
        <i class="bi bi-house"></i>
        <span>หน้าหลัก</span>
      </a>
    </li><!-- End Dashboard Nav -->

    <!-- งานทรัพยากรบุคคล 
    <li class="nav-item">
      <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
        <i class="bi bi-people"></i><span>งานทรัพยากรบุคคล</span><i class="bi bi-chevron-down ms-auto"></i>
      </a>
      <ul id="components-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
        <li>
          <a href="recruitment.php">
            <i class="bi bi-arrow-right-circle-fill"></i><span>ประกาศรับสมัครงาน</span>
          </a>
        </li>
        <li>
          <a href="Announcement.php">
            <i class="bi bi-arrow-right-circle-fill"></i><span>ประกาศรายชื่อผู้มีสิทธิเข้าสอบและสอบสัมภาษณ์</span>
          </a>
        </li>
        <li>
          <a href="qualified.php">
            <i class="bi bi-arrow-right-circle-fill"></i><span>ประกาศรายชื่อผู้ผ่านการคัดเลือก</span>
          </a>
        </li>
      </ul>
    </li><!-- End Components Nav -->

    <li class="nav-item">
      <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
        <i class="bi bi-journal-text"></i><span>หน่วยงานพัสดุ</span><i class="bi bi-chevron-down ms-auto"></i>
      </a>
      <ul id="forms-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
        <li>
          <a href="procurement.php">
            <i class="bi bi-arrow-right-circle-fill"></i><span>ประกวดราคา จัดซื้อ-จัดจ้าง</span>
          </a>
        </li>
      </ul>
    </li><!-- End Forms Nav -->

    <li class="nav-item">
      <a class="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
        <i class="bi bi-file-earmark"></i><span>ลิงค์ที่เกี่ยวข้อง</span><i class="bi bi-chevron-down ms-auto"></i>
      </a>
      <ul id="tables-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
        <li>
          <a href="https://hr.moph.go.th/site/hr_moph/?page_id=3912" target="_blank">
            <i class="bi bi-arrow-right-circle-fill"></i><span>มาตรฐานกำหนดตำแหน่ง</span>
          </a>
        </li>
        <li>
          <a href="https://hr.moph.go.th/site/hr_moph/?page_id=4225" target="_blank">
            <i class="bi bi-arrow-right-circle-fill"></i><span>กองทุนสำรองเลี้ยงชีพ</span>
          </a>
        </li>
        <li>
          <a href="https://hr.moph.go.th/site/hr_moph/?page_id=4459" target="_blank">
            <i class="bi bi-arrow-right-circle-fill"></i><span>คู่มือต่าง ๆ</span>
          </a>
        </li>
        <li>
          <a href="/pcnana/procurement/pdf/บันทึกข้อความขึ้นทะเบียนครุภัณฑ์บริจาค.doc" download>
            <i class="bi bi-arrow-right-circle-fill"></i><span>บันทึกข้อความขึ้นทะเบียนครุภัณฑ์บริจาค</span>
          </a>
        </li>

      </ul>
    </li><!-- End Tables Nav -->

    <li class="nav-item">
      <a class="nav-link collapsed" href="contact.php">
        <i class="bi bi-telephone"></i>
        <span>ติดต่อเรา</span>
      </a>
    </li><!-- End Dashboard Nav -->

    <!-- li class="nav-item">
      <a class="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
        <i class="bi bi-bar-chart"></i><span>Charts</span><i class="bi bi-chevron-down ms-auto"></i>
      </a>
      <ul id="charts-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
        <li>
          <a href="charts-chartjs.html">
            <i class="bi bi-circle"></i><span>Chart.js</span>
          </a>
        </li>
        <li>
          <a href="charts-apexcharts.html">
            <i class="bi bi-circle"></i><span>ApexCharts</span>
          </a>
        </li>
        <li>
          <a href="charts-echarts.html">
            <i class="bi bi-circle"></i><span>ECharts</span>
          </a>
        </li>
      </ul>
    </li><!-- End Charts Nav -->

    <!--li class="nav-item">
      <a class="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="#">
        <i class="bi bi-gem"></i><span>Icons</span><i class="bi bi-chevron-down ms-auto"></i>
      </a>
      <ul id="icons-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
        <li>
          <a href="icons-bootstrap.html">
            <i class="bi bi-circle"></i><span>Bootstrap Icons</span>
          </a>
        </li>
        <li>
          <a href="icons-remix.html">
            <i class="bi bi-circle"></i><span>Remix Icons</span>
          </a>
        </li>
        <li>
          <a href="icons-boxicons.html">
            <i class="bi bi-circle"></i><span>Boxicons</span>
          </a>
        </li>
      </ul>
    </li><!-- End Icons Nav -->
  </ul>

</aside>