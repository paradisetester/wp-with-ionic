import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../shared/data.service';
import {environment} from '../../environments/environment';
import { HttpClient, HttpResponse, HttpClientModule } from '@angular/common/http';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// import pagination component
import { JwPaginationComponent } from 'jw-angular-pagination';

import { HtmlheadService } from '../../providers/seo/seo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
 
})
export class HomePage {
	
	items: any[];
	 // array of all items to be paged
   // items: Array<any>;
    // current page of items
    pageOfItems: any[];
	
	dateFormat = environment.dateFormat;
	skeletion=true;
	section_web=false;
	
	
	
    constructor(public dataService: DataService,private http: Http, public htmlheadService:HtmlheadService) {
		
		/*************sco service**************/
			var title='MY AGING AND WELLNESS';
			var description='MY AGING AND WELLNESS';
			var keywords='MY AGING AND WELLNESS';
			
			var img='assets/images/icon.png';
			
			this.htmlheadService.addMeta(title,description,keywords,img);
			this.htmlheadService.addMetaOg(title,description,keywords,img);
			this.htmlheadService.addMetaTwitter(title,description,keywords,img);
    }

	ngOnInit() {
        
        this.http.get('../../assets/js/all-posts.json')
            .map((response: Response) => response.json())
            .subscribe(data => {
				console.log(data);
					this.items = data;
					
					
					this.skeletion=false;
					this.section_web=true;
            });
    }

	
	onChangePage(pageOfItems: Array<any>) {
		// update current page of items
		this.pageOfItems = pageOfItems;
	}		
	
	
	strip_html_tags(str)
		{
		   if ((str===null) || (str===''))
			   return false;
		  else
		   str = str.toString();
		  return str.replace(/<[^>]*>/g, '');
		}
}
