import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { formatDate } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { Moment } from 'moment';
import { Observable, Subscription } from 'rxjs';
import { filter, map, pairwise, throttleTime } from 'rxjs/operators';
import EnumConstant, { UserStatusEnum } from 'src/app/models/enums/enumConstant';
import { Filter, OptionParam, useFilter } from 'src/app/models/filter';
import { SchoolService } from 'src/app/services/school.service';
import { ApprovedStudentPipe } from 'src/app/shares/status-pipe/pipes/approved-student.pipe';
import { ScholarshipStatusPipe } from 'src/app/shares/status-pipe/pipes/scholarship-status.pipe';
import { TableStatusPipe } from 'src/app/shares/status-pipe/pipes/table-status.pipe';
import { TranslateStatusPipe } from 'src/app/shares/status-pipe/pipes/translate-status.pipe';
import { VerifyStudentPipe } from 'src/app/shares/status-pipe/pipes/verify-student.pipe';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [ApprovedStudentPipe, VerifyStudentPipe]
})
export class FilterComponent {
  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private translateStatusPipe: TranslateStatusPipe,
    private staffPipe: TableStatusPipe,
    private schoolService: SchoolService,
    private ScholarshipStatusPipe: ScholarshipStatusPipe,
    private approvedStudentPipe: ApprovedStudentPipe,
    private verifyStudentPipe: VerifyStudentPipe
  ) {
    this.currentUrl = router.url;
  }

  @ViewChild('subjects') subjects: MatSelectionList;
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;
  @ViewChild('select') select: MatSelect;
  @ViewChild('searchQuery') searchQuery: ElementRef;

  @Input() hide?: string[] = ['dateRange', 'date', 'yearDate'];
  @Input() useFilters: useFilter[] = [];
  @Input() title: string = '';
  @Input() passingFilters: Partial<Filter>[] = [];
  @Input() titleFilter: string = 'Subject';
  @Input() hasButton: boolean = false;
  @Input() button: { label?: string; svgIcon?: string; matIcon?: string; color?: string } = {
    label: 'button.create',
    matIcon: '',
    svgIcon: 'add_new'
  };
  @Input() apiRoute: Observable<any> = null;
  @Input() maxDate: Date;
  @Input() currentDate: { date?: Date; placeholder?: string } = null;
  @Input() statusPipe: 'staff' | 'question' | 'candidate' | 'request' | 'agree' = 'staff';

  @Output() queryEvent = new EventEmitter<string>();
  @Output() queryFilter = new EventEmitter<any>();
  @Output() actionButton: EventEmitter<any> = new EventEmitter();
  @Output() dateRangeEvent = new EventEmitter<any>();
  @Output() dateEvent = new EventEmitter<any>();

  date: Date = new Date();
  firstDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  lastDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
  start_date = new FormControl(this.firstDate);
  end_date = new FormControl(this.lastDate);
  dateNow = new FormControl(this.currentDate);

  params: any = {};
  userStatusEnum = UserStatusEnum;
  selectedSubjects: { value: string; label: string }[] = [];
  subjectOptions: any;
  previousFilters: number[] = [];
  filterSet = new Set();
  showFilter: boolean;
  total: number = 0;
  faslsy: boolean[] = [];

  filters: Filter[] = [
    {
      title: 'Grade',
      use: false,
      data: [],
      paramKey: 'grades',
      labelFunc: 'Grade',
      svgIcon: 'filter-grading'
    },
    {
      title: 'Academic Program',
      use: false,
      data: [],
      labelFunc: 'Academic Program',
      paramKey: 'programs',
      svgIcon: 'academic_program'
    },
    {
      title: 'Academic Year',
      use: false,
      data: [],
      labelFunc: 'Academic Year',
      paramKey: 'academic_years',
      svgIcon: 'academic_year'
    },
    {
      title: 'Year',
      use: false,
      data: [
        {
          value: null,
          label: 'All'
        },
        {
          value: 1,
          label: '1'
        },
        {
          value: 2,
          label: '2'
        },
        {
          value: 3,
          label: '3'
        },
        {
          value: 4,
          label: '4'
        },
        {
          value: 5,
          label: '5'
        },
        {
          value: 6,
          label: '6'
        },
        {
          value: 7,
          label: '7'
        },
        {
          value: 8,
          label: '8'
        }
      ],
      labelFunc: 'Year',
      paramKey: 'year',
      svgIcon: 'year'
    },
    {
      title: 'Generation',
      use: false,
      data: [],
      labelFunc: 'Generation',
      paramKey: 'generations',
      svgIcon: 'generation'
    },
    {
      title: 'Subject',
      use: false,
      data: [],
      labelFunc: 'Subject',
      paramKey: 'subjects',
      svgIcon: 'subject',
      isMultiple: true
    },
    {
      title: 'Student',
      use: false,
      data: [],
      labelFunc: 'Student',
      paramKey: 'students',
      svgIcon: 'person'
    },
    {
      title: 'Category',
      use: false,
      data: [],
      labelFunc: 'Categories',
      paramKey: 'categories',
      svgIcon: 'categories'
    },
    {
      title: 'School',
      use: false,
      data: [],
      labelFunc: 'School',
      paramKey: 'schools',
      svgIcon: 'school',
      translate: 'filter.schools'
    },
    {
      title: 'Month',
      use: false,
      data: [],
      labelFunc: 'Month',
      paramKey: 'month',
      svgIcon: 'school',
      translate: 'filter.month'
    },
    {
      title: 'Department',
      use: false,
      data: [],
      labelFunc: 'Departments',
      paramKey: 'departments',
      svgIcon: 'department'
    },

    {
      title: 'Gender',
      use: false,
      data: [
        {
          value: null,
          label: 'All'
        },
        {
          value: 'female',
          label: 'Female'
        },
        {
          value: 'male',
          label: 'Male'
        }
      ],
      labelFunc: 'Gender',
      paramKey: 'gender',
      svgIcon: 'gender'
    },
    {
      title: 'status',
      use: false,

      data: [
        {
          value: null,
          label: 'All'
        },
        {
          value: EnumConstant.PUBLIC,
          label: 'Published'
        },
        {
          value: EnumConstant.UNPUBLISHED,
          label: 'Unpublished'
        },
        {
          value: EnumConstant.DRAFT,
          label: 'Draft'
        },
        {
          value: EnumConstant.DISABLED,
          label: 'Disabled'
        },
        {
          value: EnumConstant.REQUESTING,
          label: 'Pending'
        },
        {
          value: EnumConstant.REJECT,
          label: 'Reject'
        }
      ],
      paramKey: 'status',
      labelFunc: 'status',
      matIcon: 'pentagon'
    },
    {
      title: 'Created By',
      use: false,
      data: [
        {
          value: null,
          label: 'filter.all'
        },
        {
          value: 'others',
          label: 'enum_status.Others'
        },
        {
          value: 'me',
          label: 'enum_status.My Announcement'
        }
      ],
      labelFunc: 'Owner',
      paramKey: 'owned_by',
      svgIcon: 'person'
    },
    {
      title: 'status',
      use: false,

      data: [
        {
          value: null,
          label: 'All'
        },
        {
          value: EnumConstant.APPROVED,
          label: 'Approved'
        },
        {
          value: EnumConstant.REQUESTED,
          label: 'Pending'
        },
        {
          value: EnumConstant.REJECTED,
          label: 'Rejected'
        }
      ],
      paramKey: 'status_request',
      labelFunc: 'status',
      matIcon: 'pentagon'
    }
  ];
  searchSubscription: Subscription;
  currentUrl: string;

  schoolOptions: any;
  selectedYear: any;

  ngOnInit(): void {
    this.renderFilter();
  }

  ngAfterViewInit(): void {
    this.scroller
      ?.elementScrolled()
      .pipe(
        map(() => this.scroller.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => y2 < y1 && y2 < 96),
        throttleTime(50)
      )
      .subscribe(() => {
        this.recheck();
      });
  }

  onDateRageChange(value: Date): void {
    if (value) {
      this.dateRangeEvent.emit({
        start_date: formatDate(this.start_date.value, 'yyyy-MM-dd', 'en-Us'),
        end_date: formatDate(this.end_date.value, 'yyyy-MM-dd', 'en-Us')
      });
    }
  }

  onDateChange(value: Date): void {
    this.dateEvent.emit(value);
  }

  @ViewChild('filter') matMenu: MatMenuTrigger;
  filterClick(): void {
    if (this.useFilters.length < 1 && this.faslsy.every(stat => stat === true)) {
      this.matMenu.closeMenu();
    }
  }

  isFalseAll(element, index, array) {
    return element === false;
  }

  search(value: string) {
    this.queryEvent.emit(value);
  }

  onButtonAction() {
    this.actionButton.emit(null);
  }

  clear() {
    this.queryEvent.emit('');
  }

  onFilter(func: any, valueObj: any) {
    this.countFilter(func.paramKey, valueObj.value);
    const filter: OptionParam = {
      labelParam: func.labelFunc,
      value: valueObj.value,
      paramKey: func.paramKey === 'status_request' ? 'status' : func.paramKey
    };

    this.params[filter.paramKey] = filter.value;
    this.queryFilter.emit(this.params);
  }

  countFilter(paramKey: useFilter, hasValue: boolean): void {
    if (paramKey && hasValue && !this.filterSet.has(paramKey)) {
      this.filterSet.add(paramKey);
    }
    if (!hasValue) {
      this.filterSet.delete(paramKey);
    }
  }

  reset(): void {
    this.filters.forEach(filter => {
      filter.selectedValue = null;
    });
    this.selectedSubjects = [];
    this.subjects?.deselectAll();
    this.filterSet.clear();
    this.params = {};
    this.queryFilter.emit(this.params);
  }

  renderFilter(): void {
    const useFilterKeys: useFilter[] = [];
    this.passingFilters.forEach(pFilter =>
      this.filters.forEach(filter => {
        if (pFilter.paramKey === filter.paramKey) {
          filter.data = pFilter.data;
          filter.dep = pFilter.dep;
          useFilterKeys.push(filter.paramKey);
        }
      })
    );

    this.useFilters.forEach(filterName => {
      const foundFilter = this.filters.find(filter => filter.paramKey.toLowerCase() === filterName);
      foundFilter.use = true;
    });

    if (this.useFilters.includes('schools')) {
      this.getSchools();
    }

    //Concat new Filter from API
    this.onMergeNewFilter();
  }

  onMergeNewFilter(): void {
    if (this.apiRoute) {
      this.faslsy = [];
      this.apiRoute.subscribe(data => {
        for (const item in data) {
          this.faslsy.push(
            Object.values(data[item]).every((value: any) => {
              if (!value || value.length < 1) {
                return true;
              }
              return false;
            })
          );
          if (item === '_id') {
            continue;
          }

          if (data[item]?.length > 0) {
            data[item] = [{ label: 'filter.all', value: null }].concat(
              data[item].map(map => {
                if (item === 'status' || item === 'poor_status') {
                  let label: string;
                  if (this.statusPipe === 'staff') label = this.staffPipe.transform(map);
                  else if (this.statusPipe === 'request') label = this.approvedStudentPipe.transform(map);
                  else if (this.statusPipe === 'agree') label = this.verifyStudentPipe.transform(map);
                  else this.translateStatusPipe.transform(map);

                  this.arrayFilter.push({
                    label: this.statusPipe === 'agree' ? label : 'enum_status.' + label,
                    value: map,
                    key: item,
                    status: label
                  });
                  return {
                    label: this.statusPipe === 'agree' ? label : 'enum_status.' + label,
                    value: map
                  };
                } else if (item === 'gender') {
                  this.arrayFilter.push({
                    label: 'filter.' + map,
                    value: map,
                    key: item
                  });
                  return {
                    label: 'filter.' + map,
                    value: map
                  };
                } else if (item === 'scholarship_status') {
                  let label: string = this.ScholarshipStatusPipe.transform(map);
                  this.arrayFilter.push({
                    label: 'enum_status.' + label,
                    value: map,
                    key: item
                  });
                  return {
                    label: 'enum_status.' + label,
                    value: map
                  };
                }

                let label: string = map?.name ?? map?.code ?? map?._id ?? map;
                return {
                  label: label,
                  value: map._id ?? map,
                  translate: label === 'school' ? false : true
                };
              })
            );
          }
          this.filters.push({
            title: item.replace('_', ' '),
            use: true,
            data: data[item],
            labelFunc: item,
            paramKey: item === 'years' || item === 'academic_types' ? item.slice(0, -1) : (item as any),
            svgIcon: item,
            hasSearch: false,
            translate: 'filter.' + item
          });
        }
      });
    }
  }

  onCollapse(): void {
    this.searchQuery = null;
  }

  arrayFilter: any[] = [];
  onSearch(searchQuery: string, key: string): void {
    const filter = searchQuery.toLowerCase();
    for (const iterator of this.filters) {
      if (iterator.paramKey === key) {
        const newData = this.arrayFilter.filter(
          (option: any) => option.label.toString().toLowerCase().includes(filter.toLowerCase()) && key === option.key
        );
        if (newData.length > 0) {
          iterator.data = [{ label: 'All', value: null }].concat(newData);
        } else iterator.data = newData;
      }
    }
  }

  getSchools(): void {
    this.schoolService.getMany({}).subscribe(data => {
      let schoolList = data.list as any as {
        label: string;
        value: number | string | null;
      }[];
      schoolList = schoolList.map((item: any) => ({
        label: item.name,
        value: item._id
      }));
      const filter = this.filters.find((item: any) => item.paramKey === 'schools');
      filter.data = schoolList;
      this.schoolOptions = schoolList;
    });
  }

  remove(item: { value: string; label: string }, paramKey: useFilter): void {
    const itemId = item.value;
    const foundItem = this.selectedSubjects.find(item => item.value === itemId);
    const index = this.selectedSubjects.indexOf(foundItem);
    const filter = this.subjects?.options.find(option => option.value.value === item.value);
    filter.selected = false;
    this.selectedSubjects.splice(index, 1);
    this.params[paramKey] = this.selectedSubjects.map(subject => subject.value);
    this.countFilter(paramKey, this.params[paramKey].length);
    this.queryFilter.emit(this.params);
  }

  searchSubject(searchQuery: string): void {
    const filter = searchQuery.toLowerCase();
    const subjectFilterObj = this.filters.find((item: any) => item.paramKey === 'subjects');
    subjectFilterObj.data = this.subjectOptions.filter((option: any) => option.label.toLowerCase().includes(filter));
    this.cdr.detectChanges();
    const filters = this.subjects?.options.filter(option =>
      this.selectedSubjects.some(subject => subject.value === option.value.value)
    );
    this.subjects?.selectedOptions.select(...filters);
  }

  onSelectionChanges(event: MatSelectionListChange, paramKey: useFilter): void {
    const idx = this.selectedSubjects.findIndex(selection => selection.value === event.options[0].value.value);
    if (event.options[0].selected && idx === -1) {
      this.selectedSubjects.push(event.options[0].value);
    }
    if (!event.options[0].selected && idx !== -1) {
      this.selectedSubjects.splice(idx, 1);
    }
    this.params[paramKey] = this.selectedSubjects.map(subject => subject.value);
    this.countFilter(paramKey, this.params[paramKey].length);
    this.queryFilter.emit(this.params);
  }

  recheck(): void {
    const filters = this.subjects?.options.filter(option =>
      this.selectedSubjects.some(subject => subject.value === option.value.value)
    );
    this.subjects?.selectedOptions.select(...filters);
  }

  getFilterByKey(key: string): Filter {
    return this.filters.find(filter => filter.paramKey === key);
  }

  yearChange(ctrlValue: Moment) {
    this.params['year'] = ctrlValue.year();
    this.selectedYear = ctrlValue;
    this.queryFilter.emit(this.params);
  }

  monthChange(func: any, month: any) {
    this.countFilter(func.paramKey, month);
    this.params['month'] = month;
    this.queryFilter.emit(this.params);
  }

  ngOnChanges(_: SimpleChanges): void {
    this.passingFilters.forEach(pFilter =>
      this.filters.forEach(filter => {
        if (pFilter.paramKey === filter.paramKey) {
          filter.data = pFilter.data;
          filter.dep = pFilter.dep;
        }
      })
    );
  }

  ngOnDestroy(): void {
    if (this.currentUrl === '/search') {
      this.searchSubscription.unsubscribe();
      this.currentUrl = null;
    }
  }
}
