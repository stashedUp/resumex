import { Injectable } from '@angular/core';
import * as pdfMake from 'assets/pdf/pdfmake.js';
import * as pdfFonts from 'assets/pdf/vfs_fonts.js'
// declare var pdfMake: any;
// declare var buildPdf: any;

@Injectable()
export class PrintService {
  private paper: string = "us";
  private regexp_bold = /\*\d+\*|\*\w+\*|\*\w+\,\*|\*[0-9]+(,[0-9]+)*\*|\*\w+\.\w+\*|\*\w+\.\w+\/\w+\*/g;
  constructor() { }

  generatePDF(task: string, form: any, resumetype: number): void {
    let pdf = pdfMake;
    console.log("pdfMake")
    console.log(pdfMake)
    pdfMake.vfs = pdfFonts.pdfMake.vfs; //initialize font
    pdfMake.fonts = {
      Cambria: {
        normal: 'cambria.ttf',
        bold: 'cambria-bold.ttf',
        italic: 'cambria-italic.ttf',
      }
    }

    let content: Array<Object> = [];
    let docDefinition: { [k: string]: any } = {};

    docDefinition.defaultStyle = { font: 'Cambria' }; //option to add more fonts in the future

    if (this.paper === 'us') {
      docDefinition.pageSize = 'LETTER';
      docDefinition.pageMargins = [40, 25, 40, 30]
    } else if (this.paper === 'uk') {
      docDefinition.pageSize = 'A4';
      docDefinition.pageMargins = [40, 25, 40, 30]
    }

    if (form.value.fullname) {
      content.push({ text: form.value.fullname, margin: [10, -6, 10, 3], fontSize: 22, alignment: 'center' });
    }

    if (form.value.email || form.value.phone || form.value.address) {
      let information: string = "";
      if (form.value.email) {
        information = information.concat(form.value.email);
      }
      if (form.value.phone) {
        information = information.concat(" | " + form.value.phone);
      }
      if (form.value.address) {
        information = information.concat(" | " + form.value.address);
      }
      content.push({ text: information, bold: 'true', margin: [10, 0, 10, 5], fontSize: 10, alignment: 'center' });
    }

    /* STUDENT */
    if (form.value.resumetype === 1) {

      /* EDUCATION INFO  */
      if (form.value.education) {
        if (form.value.education.length >= 1) {
          //if (form.value.education[0].school) {
          //grey line
          content.push({ canvas: [{ type: 'line', x1: -8, y1: 5, x2: 620 - 2 * 40, y2: 5, lineWidth: 0.25, lineColor: '#DCDCDC', }] });
          content.push({ text: 'EDUCATION', alignment: 'left', bold: 'true', margin: [0, 5, 10, 2], fontSize: 11 })
          //}
          for (let edu of form.value.education) {

            let grad_date = ""
            if (edu.grad_month) {
              grad_date = grad_date.concat(edu.grad_month)
            }
            if (edu.grad_year) {
              grad_date = grad_date.concat(" " + edu.grad_year)
            }

            let school_info: string = "";
            if (edu.school) {
              school_info = school_info.concat(edu.school);
            }
            if (edu.school_location) {
              school_info = school_info.concat(" | " + edu.school_location);
            }

            if ((edu.school || edu.school_location) && (!edu.degree) && (edu.grad_month || edu.grad_year)) {


              if (edu.school || edu.school_location) {
                content.push(
                  {
                    columns: [
                      {
                        width: 'auto',
                        stack: [
                          {
                            text: school_info, alignment: 'left', bold: 'true', fontSize: 11
                          }
                        ]
                      },
                      {
                        text: grad_date, alignment: 'right', bold: 'true', fontSize: 11
                      }
                    ]
                  },
                )
              }
            } else {
              if (edu.school || edu.school_location) {
                content.push({ text: school_info, alignment: 'left', bold: 'true', margin: [0, 0, 10, 0], fontSize: 11 });
              }
            }
            if (edu.degree && (edu.grad_month || edu.grad_year)) {
              content.push(
                {
                  columns: [
                    {
                      width: 'auto',
                      stack: [
                        {
                          text: edu.degree, alignment: 'left', bold: 'true', fontSize: 11
                        }
                      ]
                    },
                    {
                      text: grad_date, alignment: 'right', bold: 'true', fontSize: 11
                    }
                  ]
                },
              )
            }
            if (edu.education_description.length >= 1) {
              let ul: Array<Object> = [];
              for (let description of edu.education_description) {
                ul.push(description.brief_description);
              }
              content.push({ ul, margin: [10, 2, 10, 3], fontSize: 10 });
            }
          }
        }
      }

      /* INVOLVEMENT INFO */
      if (form.value.involvement) {
        if (form.value.involvement.length >= 1) {
          // if (form.value.involvements[0].involvement_name) {
          //grey line
          content.push({ canvas: [{ type: 'line', x1: -8, y1: 5, x2: 620 - 2 * 40, y2: 5, lineWidth: 0.25, lineColor: '#DCDCDC', }] })
          content.push({ text: 'INVOLVEMENT', alignment: 'left', bold: 'true', margin: [0, 5, 10, 2], fontSize: 11 })
          //}
          for (let activity of form.value.involvement) {

            let involvement = ""
            if (activity.involvement_name) {
              involvement = involvement.concat(activity.involvement_name)
            }
            if (activity.position_title) {
              involvement = involvement.concat(" | " + activity.position_title)
            }

            let activity_date = ""
            if (activity.start_month) {
              activity_date = activity_date.concat(activity.start_month)
            }
            if (activity.position_title) {
              activity_date = activity_date.concat(" " + activity.start_year)
            }
            if (activity.involvement_name) {
              activity_date = activity_date.concat(" - " + activity.end_month)
            }
            if (activity.position_title) {
              activity_date = activity_date.concat(" " + activity.end_year)
            }

            if ((activity.involvement_name || activity.position_title) || (activity.start_month || activity.start_year || activity.end_month || activity.end_year)) {

              content.push(
                {
                  columns: [
                    {
                      width: 'auto',
                      stack: [
                        {
                          text: involvement, alignment: 'left', bold: 'true', fontSize: 11
                        }
                      ]
                    },
                    {
                      text: activity_date, alignment: 'right', bold: 'true', fontSize: 11
                    }
                  ]
                },
              )
            }
            if (activity.involvement_description) {
              if (activity.involvement_description.length >= 1) {
                let ul: Array<Object> = [];
                for (let description of activity.involvement_description) {
                  ul.push(description.brief_description);
                }
                content.push({ ul, margin: [10, 2, 10, 3], fontSize: 10 });
              }
            }
          }
        }
      }

      /* JOBS INFO */
      if (form.value.jobs) {
        if (form.value.jobs.length >= 1) {
          //if (form.value.jobs[0].company) {
          //grey line
          content.push({ canvas: [{ type: 'line', x1: -8, y1: 5, x2: 620 - 2 * 40, y2: 5, lineWidth: 0.25, lineColor: '#DCDCDC', }] });
          content.push({ text: 'PROFESSIONAL EXPERIENCE', alignment: 'left', bold: 'true', margin: [0, 5, 10, 2], fontSize: 11 })
          //}
          for (let job of form.value.jobs) {

            let job_info: string = "";
            if (job.company) {
              job_info = job_info.concat(job.company);
            }
            if (job.company_location) {
              job_info = job_info.concat(" | " + job.company_location);
            }

            let job_date = ""
            if (job.start_month) {
              job_date = job_date.concat(job.start_month)
            }
            if (job.start_year) {
              job_date = job_date.concat(" " + job.start_year)
            }
            
            if (job.present === true){   
              job_date = job_date.concat(" - " + "Present")
            }else{
              if (job.end_month) {
                job_date = job_date.concat(" - " + job.end_month)
              }
              if (job.end_year) {
                job_date = job_date.concat(" " + job.end_year)
              }
            }


            if ((job.company || job.company_location) || job_date) {
              if ((job.company || job.company_location) && (!job.job_title)) {
                content.push(
                  {
                    columns: [
                      {
                        width: 'auto',
                        stack: [
                          {
                            text: job_info, alignment: 'left', bold: 'true', fontSize: 11
                          }
                        ]
                      },
                      {
                        text: job_date, alignment: 'right', bold: 'true', fontSize: 11
                      }
                    ]
                  },
                )
              } else {
                content.push({ text: job_info, alignment: 'left', bold: 'true', margin: [0, 0, 10, 0], fontSize: 11 });
              }
            }

            if (job.job_title && job_date) {
              content.push(
                {
                  columns: [
                    {
                      width: 'auto',
                      stack: [
                        {
                          text: job.job_title, alignment: 'left', bold: 'true', fontSize: 11
                        }
                      ]
                    },
                    {
                      text: job_date, alignment: 'right', bold: 'true', fontSize: 11
                    }
                  ]
                },
              )
            }
            if (job.job_description.length >= 1) {
              let ul: Array<Object> = [];
              for (let description of job.job_description) {
                ul.push(description.brief_description);
              }
              content.push({ ul, margin: [10, 2, 10, 3], fontSize: 10 });
            }
          }
        }
      }

      /* PERSONAL INFO */
      if (form.value.personal) {
        if (form.value.personal.length >= 1) {
          //if (form.value.personal[0].personal_details) {
          //grey line
          content.push({ canvas: [{ type: 'line', x1: -8, y1: 5, x2: 620 - 2 * 40, y2: 5, lineWidth: 0.25, lineColor: '#DCDCDC', }] })
          content.push({ text: 'INTEREST AND AWARDS', alignment: 'left', bold: 'true', margin: [0, 5, 10, 2], fontSize: 11 })
          //}
          let ul: Array<Object> = [];
          for (let activity of form.value.personal) {

            var arr_string = this.string_to_array(activity.personal_details)
            //var regexp_bold = /\*\d+\*|\*\w+\*|\*\w+\,\*|\*[0-9]+(,[0-9]+)*\*/g
            //var regexp_italic = /\_\w+\_/g
            var arr_word = []
            for (let word of arr_string){
                if(word.match(this.regexp_bold)){
                  if((word.charAt(0) === '*' && word.charAt(word.length - 1) === '*')) {        
                      word = word.substr(1);
                      word = word.slice(0, -1);
                      arr_word.push( {text: word+" " ,  style: 'header' ,bold: true})
                  }
                }else{
                  arr_word.push(word+" ")
                }
            }

            ul.push({
              italics: false,
              text: arr_word
            })
            
          }
          content.push({ ul, margin: [10, 1, 10, 3], fontSize: 10 });
        }
      }
    }

    /* PROFESSIONAL  */
    if (form.value.resumetype === 2) {

      /* JOBS INFO */
      if (form.value.jobs) {
        if (form.value.jobs.length >= 1) {
          //if (form.value.jobs[0].company) {
          //grey line
          content.push({ canvas: [{ type: 'line', x1: -8, y1: 5, x2: 620 - 2 * 40, y2: 5, lineWidth: 0.25, lineColor: '#DCDCDC', }] });
          content.push({ text: 'PROFESSIONAL EXPERIENCE', alignment: 'left', bold: 'true', margin: [0, 5, 10, 2], fontSize: 11 })
          //}
          for (let job of form.value.jobs) {

            let job_info: string = "";
            if (job.company) {
              job_info = job_info.concat(job.company);
            }
            if (job.company_location) {
              job_info = job_info.concat(" | " + job.company_location);
            }

            let job_date = ""
            if (job.start_month) {
              job_date = job_date.concat(job.start_month)
            }
            if (job.start_year) {
              job_date = job_date.concat(" " + job.start_year)
            }

            if (job.present === true){   
                job_date = job_date.concat(" - " + "Present")
            }else{
              if (job.end_month) {
                job_date = job_date.concat(" - " + job.end_month)
              }
              if (job.end_year) {
                job_date = job_date.concat(" " + job.end_year)
              }
            }

            if ((job.company || job.company_location) || job_date) {
              if ((job.company || job.company_location) && (!job.job_title)) {
                content.push(
                  {
                    columns: [
                      {
                        width: 'auto',
                        stack: [
                          {
                            text: job_info, alignment: 'left', bold: 'true', fontSize: 11
                          }
                        ]
                      },
                      {
                        text: job_date, alignment: 'right', bold: 'true', fontSize: 11
                      }
                    ]
                  },
                )
              } else {
                content.push({ text: job_info, alignment: 'left', bold: 'true', margin: [0, 0, 10, 0], fontSize: 11 });
              }
            }

            if (job.job_title && job_date) {
              content.push(
                {
                  columns: [
                    {
                      width: 'auto',
                      stack: [
                        {
                          text: job.job_title, alignment: 'left', bold: 'true', fontSize: 11
                        }
                      ]
                    },
                    {
                      text: job_date, alignment: 'right', bold: 'true', fontSize: 11
                    }
                  ]
                },
              )
            }
            if (job.job_description.length >= 1) {
              let ul: Array<Object> = [];
              for (let description of job.job_description) {
                ul.push(description.brief_description);
              }
              content.push({ ul, margin: [10, 2, 10, 3], fontSize: 10 });
            }
          }
        }
      }

      /* EDUCATION INFO  */
      if (form.value.education) {
        if (form.value.education.length >= 1) {
          //if (form.value.education[0].school) {
          //grey line
          content.push({ canvas: [{ type: 'line', x1: -8, y1: 5, x2: 620 - 2 * 40, y2: 5, lineWidth: 0.25, lineColor: '#DCDCDC', }] });
          content.push({ text: 'EDUCATION', alignment: 'left', bold: 'true', margin: [0, 5, 10, 2], fontSize: 11 })
          //}
          for (let edu of form.value.education) {

            let grad_date = ""
            if (edu.grad_month) {
              grad_date = grad_date.concat(edu.grad_month)
            }
            if (edu.grad_year) {
              grad_date = grad_date.concat(" " + edu.grad_year)
            }

            let school_info: string = "";
            if (edu.school) {
              school_info = school_info.concat(edu.school);
            }
            if (edu.school_location) {
              school_info = school_info.concat(" | " + edu.school_location);
            }

            if ((edu.school || edu.school_location) && (!edu.degree) && (edu.grad_month || edu.grad_year)) {


              if (edu.school || edu.school_location) {
                content.push(
                  {
                    columns: [
                      {
                        width: 'auto',
                        stack: [
                          {
                            text: school_info, alignment: 'left', bold: 'true', fontSize: 11
                          }
                        ]
                      },
                      {
                        text: grad_date, alignment: 'right', bold: 'true', fontSize: 11
                      }
                    ]
                  },
                )
              }
            } else {
              if (edu.school || edu.school_location) {
                content.push({ text: school_info, alignment: 'left', bold: 'true', margin: [0, 0, 10, 0], fontSize: 11 });
              }
            }
            if (edu.degree && (edu.grad_month || edu.grad_year)) {
              content.push(
                {
                  columns: [
                    {
                      width: 'auto',
                      stack: [
                        {
                          text: edu.degree, alignment: 'left', bold: 'true', fontSize: 11
                        }
                      ]
                    },
                    {
                      text: grad_date, alignment: 'right', bold: 'true', fontSize: 11
                    }
                  ]
                },
              )
            }
            if (edu.education_description.length >= 1) {
              let ul: Array<Object> = [];
              for (let description of edu.education_description) {
                ul.push(description.brief_description);
              }
              content.push({ ul, margin: [10, 2, 10, 3], fontSize: 10 });
            }
          }
        }
      }

      /* INVOLVEMENT INFO */
      if (form.value.involvement) {
        if (form.value.involvement.length >= 1) {
          //if (form.value.involvements[0].involvement_name) {
          //grey line
          content.push({ canvas: [{ type: 'line', x1: -8, y1: 5, x2: 620 - 2 * 40, y2: 5, lineWidth: 0.25, lineColor: '#DCDCDC', }] })
          content.push({ text: 'INVOLVEMENT', alignment: 'left', bold: 'true', margin: [0, 5, 10, 2], fontSize: 11 })
          //}
          for (let activity of form.value.involvement) {

            let involvement = ""
            if (activity.involvement_name) {
              involvement = involvement.concat(activity.involvement_name)
            }
            if (activity.position_title) {
              involvement = involvement.concat(" | " + activity.position_title)
            }

            let activity_date = ""
            if (activity.start_month) {
              activity_date = activity_date.concat(activity.start_month)
            }
            if (activity.position_title) {
              activity_date = activity_date.concat(" " + activity.start_year)
            }
            if (activity.involvement_name) {
              activity_date = activity_date.concat(" - " + activity.end_month)
            }
            if (activity.position_title) {
              activity_date = activity_date.concat(" " + activity.end_year)
            }

            if ((activity.involvement_name || activity.position_title) || (activity.start_month || activity.start_year || activity.end_month || activity.end_year)) {

              content.push(
                {
                  columns: [
                    {
                      width: 'auto',
                      stack: [
                        {
                          text: involvement, alignment: 'left', bold: 'true', fontSize: 11
                        }
                      ]
                    },
                    {
                      text: activity_date, alignment: 'right', bold: 'true', fontSize: 11
                    }
                  ]
                },
              )
            }
            if (activity.involvement_description) {
              if (activity.involvement_description.length >= 1) {
                let ul: Array<Object> = [];
                for (let description of activity.involvement_description) {
                  ul.push(description.brief_description);
                }
                content.push({ ul, margin: [10, 2, 10, 3], fontSize: 10 });
              }
            }
          }
        }
      }

      console.log("pdfMake")
      /* PERSONAL INFO */
      if (form.value.personal) {
        if (form.value.personal.length >= 1) {
          //if (form.value.personal[0].personal_details) {
          //grey line
          content.push({ canvas: [{ type: 'line', x1: -8, y1: 5, x2: 620 - 2 * 40, y2: 5, lineWidth: 0.25, lineColor: '#DCDCDC', }] })
          content.push({ text: 'INTEREST AND AWARDS', alignment: 'left', bold: 'true', margin: [0, 5, 10, 2], fontSize: 11 })
          //}
          let ul: Array<Object> = [];
          for (let activity of form.value.personal) {

            var arr_string = this.string_to_array(activity.personal_details)
            //var regexp_bold = /\*\w+\*/g
            //var regexp_italic = /\_\w+\_/g
            var arr_word = []
            for (let word of arr_string){
                if(word.match(this.regexp_bold)){
                  if((word.charAt(0) === '*' && word.charAt(word.length - 1) === '*')) {        
                      word = word.substr(1);
                      word = word.slice(0, -1);
                      arr_word.push( {text: word+" " ,  style: 'header' ,bold: true})
                  }
                }else{
                  arr_word.push(word+" ")
                }
            }

            ul.push({
              italics: false,
              text: arr_word
            })
          }
          content.push({ ul, margin: [10, 1, 10, 3], fontSize: 10 });
        }
      }
    }

    docDefinition.content = content;

    if (task === 'preview') { //preview opens innew tab
      pdf.createPdf(docDefinition).open();
    } else if (task === 'print') { //print downloads to machine
      pdf.createPdf(docDefinition).download();
    }
  }

  string_to_array(str) {
    return str.trim().split(" ");
  };

  replaceAll(str, replace) {
    console.log("this")
    var regex = /\*\w+\*/g
    var ym = "\\$1"
    return str.replace(regex, ym);
  }

  escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }
}
