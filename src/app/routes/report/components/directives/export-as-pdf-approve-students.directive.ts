import { Directive, HostListener, Input } from '@angular/core';
import { Column, Content, TDocumentDefinitions, TFontDictionary, TableCell, TableLayout } from 'pdfmake/interfaces';
import { Base64ImagePipe } from 'src/app/shares/file/base64-image.pipe';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'src/assets/fonts/vfs_fonts.js';
import { StudentRequests } from 'src/app/models/student';
import { KhmerDatePipe } from 'src/app/shares/khmer-date/khmer-date.pipe';
import { SchoolService } from 'src/app/services/school.service';
import { Params } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

type TitleHeader = {
  title: string;
  dataKey: string;
};

type GraphReq = {
  id: number;
  name: string;
  gender: string;
  phone_number: string;
  poor_id: string;
  schools: string;
  majors: string;
};

type DataTable = {
  title: Content;
  body?: Content;
};

@Directive({
  selector: '[appExportAsPdfApproveStudents]'
})
export class ExportAsPdfApproveStudentsDirective {

  tableLayout: TableLayout = {
    hLineWidth: () => {
      return 0.1;
    },
    vLineWidth: () => {
      return 0.1;
    },
    hLineColor: () => {
      return '#f5f7f9';
    },
    vLineColor: () => {
      return '#f5f7f9';
    },
    fillColor(rowIndex: number) {
      return rowIndex % 2 === 0 ? '#fafafa' : null;
    }
  };

  params: Params = {
    start_date: '',
    end_date: '',
    schools: '',
    limit: 0,
    page: 1
  };
  schoolName: string;
  list: StudentRequests[];
  
  @Input('appExportAsPdfApproveStudents') data: { params: Params, filterParams: Params };

  constructor(
    private khmerDatePipe: KhmerDatePipe,
    private base64ImagePipe: Base64ImagePipe,
    private schoolService: SchoolService,
    private reportService: ReportService
  ) { }

  @HostListener('click') onClick() {
    this.params.start_date = this.data.params?.start_date;
    this.params.end_date = this.data.params?.end_date;
    this.params.schools = this.data.filterParams?.schools ? this.data.filterParams?.schools : null;

    this.getApprovedList();
  }

  getApprovedList() {
    this.reportService.getApprovedList(this.params).subscribe(
      res => {
        this.list = res.list;

        if (this.params.schools) {
          this.schoolService.getById(this.params.schools).subscribe(
            res => {
              this.schoolName = res.name;
              this.showPdf();
            });
        } else {
          this.schoolName = null;
          this.showPdf();
        }
      }
    );
  }

  async showPdf(): Promise<void> {
    const graphReq: TableCell[][] = this.mapTableBody<GraphReq>(
      this.graphRequestData().column,
      this.graphRequestData().row
    );
    this.onCreatePDF(graphReq);
  }

  mapTableBody<T>(columns: TitleHeader[], rows: T[]): TableCell[][] {
    const tbData: TableCell[][] = [];
    let titleKey: string = 'title';

    // Apply header
    const th: Column[] = [];
    columns.forEach((val: TitleHeader) => {
      th.push({ text: val[titleKey], style: 'tableHeader' });
    });
    tbData.push(th);

    // map body of table
    rows.forEach((vr: T) => {
      const tmpRow: Column[] = [];
      columns.forEach((vc: TitleHeader) => {
        tmpRow.push(vr[vc['dataKey']]);
      });
      tbData.push(tmpRow);
    });

    return tbData;
  }

  /**
 * @Custom_Data
 */
  graphRequestData(): { column: TitleHeader[]; row: GraphReq[] } {

    const columnsData: TitleHeader[] = [
      { title: '#', dataKey: 'id' },
      { title: 'ឈ្មោះ', dataKey: 'name' },
      { title: 'ភេទ', dataKey: 'gender' },
      { title: 'ទូរស័ព្ទ', dataKey: 'phone_number' },
      { title: 'លេខប័ណ្ណក្រីក្រ', dataKey: 'poor_id' },
      { title: 'គ្រឹះស្ថាន អ.ប.វ.', dataKey: 'schools' },
      { title: 'ជំនាញ', dataKey: 'majors' },
    ];
    let rowData: GraphReq[] = [];

    for (let i: number = 0; i < this.list?.length; i++) {
      rowData.push({
        id: i + 1,
        name: this.list[i].last_name + " " + this.list[i].first_name,
        gender: this.list[i].gender,
        phone_number: this.list[i].phone_number ? this.list[i].phone_number : "--/--",
        poor_id: this.list[i].poor_id ? this.list[i].poor_id : "--/--",
        schools: this.list[i].schools.name,
        majors: this.list[i].apply_majors.name
      });
    }
    
    return {
      column: columnsData,
      row: rowData
    };
  }

  async onCreatePDF(data: any): Promise<void> {
    let docDefinition: TDocumentDefinitions = await this.getDocumentDefinition(data);

    let fonts: TFontDictionary = {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
      },
      Battambang: {
        normal: 'Battambang-Regular.ttf',
        bold: 'Battambang-Bold.ttf',
        italics: 'Battambang-Regular.ttf',
        bolditalics: 'Battambang-Regular.ttf'
      }
    };
    pdfMake.createPdf(docDefinition, null, fonts).open();
  }

  /**
 * @PDF_Layout
 */
  async getDocumentDefinition(objData: any): Promise<TDocumentDefinitions> {
    (<any>pdfMake).pageLayout = {
      height: 842,
      width: 595,
      margins: Array(4).fill(25)
    };

    return {
      pageSize: 'A4',
      pageMargins: (<any>pdfMake).pageLayout.margins,
      info: {
        title: 'request-report.pdf'
      },
      content: [
        {
          columns: [
            {
              image: await this.base64ImagePipe.transform('assets/imgs/logo.svg'),
              fit: [45, 45],
              margin: [0, 14, 0, 0]
            } as any,
            {
              text: 'ប្រព័ន្ធគ្រប់គ្រងអាហារូបករណ៍',
              style: 'header',
              font: 'Battambang',
              margin: [-140, 10, 0, 0]
            },
            {
              text: 'របាយការណ៍',
              style: 'header',
              font: 'Battambang',
              margin: [0, 10, 0, 0],
              alignment: 'right'
            }
          ],
          alignment: 'justify'
        },
        '\n',
        {
          text: 'កាលបរិច្ឆេទ',
          style: 'bigger',
          font: 'Battambang',
          margin: [0, 0, 0, 2]
        },
        {
          text: 'ចាប់ពី៖ ' + this.khmerDatePipe.transform(this.params.start_date, 'dd MMMM yyyy'),
          color: 'grey',
          fontSize: 11
        },
        {
          text: 'ដល់៖ ' + this.khmerDatePipe.transform(this.params.end_date, 'dd MMMM yyyy'),
          color: 'grey',
          fontSize: 11
        },
        (this.schoolName)
          ? {
            text: 'គ្រឹះស្ថាន អ.ប.វ.៖ ' + this.schoolName,
            color: 'grey',
            fontSize: 11
          }
        : null,
        '\n',
        this.graphReqTable()?.title,
        this.graphReqTable(objData)?.body
      ],

      styles: {
        header: {
          font: 'Roboto',
          fontSize: 18,
          bold: true
        },
        bigger: {
          font: 'Roboto',
          fontSize: 14,
          bold: true
        },
        tableHeader: {
          fontSize: 11,
          bold: true,
          color: 'black',
          margin: [2, 2, 2, 2]
        }
      },

      // Default style
      defaultStyle: {
        font: 'Battambang',
        fontSize: 10,
        columnGap: 32
      }
    };
  }

  graphReqTable(data?: TableCell[][]): DataTable | null {
    const title: Content = {
      text: 'បញ្ជីឈ្មោះបេក្ខជន',
      style: 'bigger',
      font: 'Battambang',
      margin: [0, 0, 0, 4]
    };
    const body: Content = {
      table: {
        widths: [20, '*', 50, 80, 80, 100, 80],
        heights: 'auto',
        body: data
      },
      layout: this.tableLayout
    };
    return data ? { title, body } : { title };
  }

}
