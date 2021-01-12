<!-- BEGIN: Header-->
<nav class="header-navbar navbar-expand-lg navbar navbar-with-menu floating-nav navbar-light navbar-shadow">
    <div class="navbar-wrapper">
        <div class="navbar-container content">
            <div class="navbar-collapse" id="navbar-mobile">
                <div class="mr-auto float-left bookmark-wrapper d-flex align-items-center">

                </div>
                @if (request()->user())
                <ul class="nav navbar-nav float-right">
                    <li class="dropdown dropdown-user nav-item">
                        <a class="dropdown-toggle nav-link dropdown-user-link" href="#" data-toggle="dropdown">
                            <div class="user-nav d-sm-flex d-none">
                                <span class="user-name text-bold-500 font-small-3">{{ request()->user()->email }}</span>
                            </div>
                            <div class="avatar mr-1">
                                <span class="avatar-content"><i class="avatar-icon feather icon-user"></i></span>
                                <span class="avatar-status-online"></span>
                            </div>
                            <!-- <span>
                                <img class="round" src="{% static 'app-assets/images/portrait/small/user.png' %}" alt="avatar" height="40" width="40">
                            </span> -->
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="{{ url('user/profile') }}"><i class="feather icon-user"></i>Edit Profile</a>
                            <div class="dropdown-divider"></div><a class="dropdown-item" href="{{ url('auth/logout') }}"><i class="feather icon-power"></i>Logout</a>
                        </div>
                    </li>
                </ul>
                @endif
            </div>
        </div>
    </div>
</nav>
<!-- END: Header-->