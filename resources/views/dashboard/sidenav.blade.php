 <!-- BEGIN: Main Menu-->
 <div class="main-menu menu-fixed menu-dark menu-accordion menu-shadow" data-scroll-to-active="true">
     <div class="navbar-header">
         <ul class="nav navbar-nav flex-row">
             <li class="nav-item mr-auto">
                 <a class="navbar-brand" href="#">
                     <!-- <div class="brand-logo"></div> -->

                     <img src="{{ asset ('app-assets/images/logo/logo.png') }}" alt="KCPE-KCSE" style="height: 25%; width: 25%; border-radius: 30%" srcset="">

                     <!-- </div> -->
                     <h2 class="brand-text mb-0" style="color: #ffff !important;">Medbook</h2>
                 </a>
             </li>
         </ul>
     </div>
     <div class="shadow-bottom"></div>
     <div class="main-menu-content">
         <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
             <li class=" nav-item"><a href="{{ url ('dashboard/home') }}"><i class="feather icon-home"></i><span class="menu-title" data-i18n="Dashboard">Dashboard</span></a>
             </li>
         </ul>
     </div>
 </div>
 <!-- END: Main Menu-->