@extends('app')
@section('content')
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <style>
        .tab-content>.active {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }
    </style>

    @php
        $teamsArray = [
            [
                'name' => 'Varinder Bansal',
                'designation' => 'Founder of Omkara Capital',
                'type' => 'Founder CEO',

                'description' => 'Over 18 years of work experience in equity research. Prior to Foundation of Omkara Capital, he was fund manager of a AMC and prior to this, Corporate Editor & Head of Research at CNBC — TV 18. He holds a degree in MSc Finance and MBA, Finance. VB has spent the last 15 years in Mumbai, learning from people across the spectrum, some of whom are his mentors',
                'experience' => '',
                'education' => '',
                'image' => asset('site/images/teams/vriender-bansal-team.jpg'),
            ],

            [
                'name' => 'Vineet Sood',
                'designation' => 'Chief Operating Officer And Principal Officer',
                'type' => 'operationTeam',

                'experience' => '15+ years of work experience in Research, Quant and Derivatives Trading. He led a prop book trading desk in his previous assignment based on quant and technical strategies. Also worked with SMC Global Securities for over 9 years as Assistant Vice President, Strategies and Automated Trading. ',
                'education' => 'Post graduated in Computer application and Finance',
                'image' => asset('site/images/teams/vineet-sood.jpg'),
            ],
            [
                'name' => 'Saloni Jain',
                'designation' => 'Compliance Officer',
                'type' => 'resarchType',

                'experience' => '2.5+ Years of work experience in compliance Shiv Hari Jalan & Co (Company Secretaries) ',
                'education' => 'Graduated in Bachelor of Business Administration from JNVU University. Associate member of Institute of Company Secretary of India (ICSI), Pursuing LLB from Mumbai University.',
                'image' => asset('site/images/teams/SaloniJain.jpg'),
                // 'holder' => 'ESOP <br> Holder',
            ],
        ];

    @endphp





    <!-- ================== Start Team New Desgin =========================== -->
    <section class="collection-one globalInvestment" style="background-color: #fff">
        <div class="container">
            <div class="row">
                <div class="col-12 horizontalTabs-cst team">
                    <!-- Iterate over unique types to render tabs -->
                    <ul class="justify-content-between nav nav-tabs" role="tablist">
                        @foreach ($teamsArray as $item)
                            <!-- Check if this type has not been rendered yet -->
                            @if (!isset($renderedTypes[$item['type']]))
                                <!-- Render tab for this type -->
                                <!-- Set the first tab as active -->
                                <li role="presentation" class="{{ $loop->first ? 'active' : '' }}">
                                    <!-- Use '#' to navigate within the page -->
                                    <a href="#{{ $item['type'] }}" aria-controls="{{ $item['type'] }}" role="tab"
                                        data-toggle="tab">{{ $item['type'] }}</a>
                                </li>
                                <!-- Mark this type as rendered -->
                                <?php $renderedTypes[$item['type']] = true; ?>
                            @endif
                        @endforeach
                    </ul>

                    <!-- Tab content -->
                    <div class="tab-content pt-md-5 pt-4 tab-cst-content">
                        <!-- Iterate over each unique type -->
                        @foreach ($renderedTypes as $type => $rendered)
                            <!-- Render tab-pane for each type -->
                            <div role="tabpanel" class="tab-pane {{ $loop->first ? 'active' : '' }}"
                                id="{{ $type }}">
                                <!-- Iterate over each team member -->
                                @foreach ($teamsArray as $teamMember)
                                    <!-- Check if the current team member belongs to the current type -->
                                    @if ($teamMember['type'] == $type)
                                        <!-- Render team member details -->
                                        <div class=" col-12 col-sm-6 col-md-6 col-lg-3  item mb-4">
                                            <div class="mentordetail empl-list">
                                                <div class="mentor_name_two  ">
                                                    <div>
                                                        <h2 class="mb-0">{{ $teamMember['name'] }} <span>
                                                                <p>{{ $teamMember['designation'] }}</p>
                                                            </span> </h2>
                                                    </div>
                                                </div>
                                                <div class="empl-description">
                                                    @if (isset($teamMember['description']) && $teamMember['description'] != '')
                                                        <p>
                                                            {{ $teamMember['description'] }}
                                                        </p>
                                                    @endif

                                                    @if ($teamMember['experience'] != '')
                                                        <p> <b>Experience:</b>
                                                            {{ $teamMember['experience'] }}
                                                        </p>
                                                    @endif

                                                    @if ($teamMember['education'] != '')
                                                        <p>
                                                            <b>Education:</b> {{ $teamMember['education'] }}
                                                        </p>
                                                    @endif

                                                </div>
                                            </div>

                                        </div>
                                    @endif
                                @endforeach

                            </div>
                        @endforeach
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- ================== End Team New Desgin =========================== -->




    <!-- ----------------------------Start Team -----------------------------  -->
    <section class="teamMember  team-one team-one__team-page" id="team">
        <div class="container">
            <div class="row">
                <!--Team Carousel -->

                {{-- @foreach ($teamsArray as $item)
                    
                    <div class=" col-12 col-sm-6 col-md-6 col-lg-3  item mb-4">
                        <div class="mentordetail empl-list">
                            <div class="mentor_name_two  ">
                                <div>
                                    <h2 class="mb-0">{{ $item['name'] }} <span>
                                            <p>{{ $item['designation'] }}</p>
                                        </span> </h2>
                                </div>
                            </div>
                            <img src="{{ $item['image'] }}" alt="{{ $item['image'] }}" class="w-100" />
                            <div class="mentor_name d-flex align-items-center justify-content-between ">
                                <div>
                                    <h2 class="mb-0">{{ $item['name'] }} <span>
                                            <p>{{ $item['designation'] }}</p>
                                        </span> </h2>
                                </div>
                            </div>
                            <div class="empl-description">
                                @if (isset($item['description']) && $item['description'] != '')
                                    <p>
                                        {{ $item['description'] }}
                                    </p>
                                @endif

                                @if ($item['experience'] != '')
                                    <p> <b>Experience:</b>
                                        {{ $item['experience'] }}
                                    </p>
                                @endif

                                @if ($item['education'] != '')
                                    <p>
                                        <b>Education:</b> {{ $item['education'] }}
                                    </p>
                                @endif

                            </div>
                        </div>
                    </div>
            
                @endforeach --}}


            </div>
        </div>
    </section>
    <!-- ----------------------------End Team -----------------------------  -->
 
@endsection
