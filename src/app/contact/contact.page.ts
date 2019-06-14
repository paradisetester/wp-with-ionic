import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {DataService} from '../shared/data.service';
import { HtmlheadService } from '../../providers/seo/seo';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
responseMsg: any;
data = {
		name: '',
		email:'',
		message:'',
		phone:'',
}
  constructor(public dataService: DataService, public htmlheadService:HtmlheadService) { }

  ngOnInit() {
			var title='MY AGING AND WELLNESS';
			var description='My aging and wellness contact us page';
			var keywords='My aging and wellness contact us page';			
			var img='assets/images/icon.png';			
			this.htmlheadService.addMeta(title,description,keywords,img);
			this.htmlheadService.addMetaOg(title,description,keywords,img);
			this.htmlheadService.addMetaTwitter(title,description,keywords,img);
  }
  
  
  public sendMail(){
	  
			 this.responseMsg = "processing...";	 
			 console.log(this.data);
			
			 if(this.data.name && this.data.email){		
				this.sendPostRequest(this.data);
				return this.responseMsg = "Thank Your for contact with us.";
			 }else{
				return this.responseMsg = "Please Enter Details.";
			 }	
				 return false; 
		}

sendPostRequest(postData) {    

    this.dataService.sendMail(postData).then((result) => {
		console.log(result);
	  }, (err) => {
		console.log(err);
	  });
  
  }
  

}
