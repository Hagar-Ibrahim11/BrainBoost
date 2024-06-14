import { Component, OnInit } from '@angular/core'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { CourseService } from '../../../Services/course/course.service'
import { ICertificate } from '../../../models/icertificate'
import { ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.css'
})
export class CertificateComponent implements OnInit{
  CourseId!:number
Certificate!:ICertificate
  constructor (private crsService:CourseService,private route:ActivatedRoute){
    this.route.params.subscribe(params => {
      this.CourseId = +params['id']; // Convert to number (if needed)
      console.log(this.CourseId)
    });
  }
  ngOnInit(): void {
   this.getCert(1)
  }

  getCert(id:number)
  {
    this.crsService.getCertificate(1).subscribe({

      next: (data: ICertificate) => {
        this.Certificate = data;
       console.log(this.Certificate)
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      },
      complete: () => {
        console.log('courses fetched successfully');
      },
    });
  }
  generatePDF()
  {
    const elementToPrint:any = document.getElementById('download')
  html2canvas(elementToPrint,{scale:2}).then((canvas) =>{
   const pdf=new jsPDF();
   pdf.addImage(canvas.toDataURL('image/png'),'PNG',0,0,211,218);
   pdf.save('BrainBoost.pdf');
  })
  }
}
