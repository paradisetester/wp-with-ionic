import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../shared/data.service';
import {environment} from '../../environments/environment';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HtmlheadService } from '../../providers/seo/seo';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
	item: any;
	items: any[];
	dateFormat = environment.dateFormat;
	skeletion=true;
	section_web=false;
	
    constructor(private route: ActivatedRoute, public dataService: DataService,private http: Http, public htmlheadService:HtmlheadService) { }

  
   ngOnInit() {
		this.http.get('../../assets/js/all-pages.json')
            .map((response: Response) => response.json())
            .subscribe(data => {
					this.items = data;					
					const itemSlug = 'about-page';	
					console.log(itemSlug);						
					this.item = this.getPostBySlug(itemSlug);
							

					/*************sco service**************/
					var title=this.item.title;
					var description=this.strip_html_tags(this.item.content);
					var keywords=this.strip_html_tags(this.item.content);					
					var img=this.item.fimg_url;
					
					this.htmlheadService.addMeta(title,description,keywords,img);
					this.htmlheadService.addMetaOg(title,description,keywords,img);
					this.htmlheadService.addMetaTwitter(title,description,keywords,img);
					
					this.skeletion=false;
					this.section_web=true;
            });
			
			
    }
	
	strip_html_tags(str)
		{
		   if ((str===null) || (str===''))
			   return false;
		  else
		   str = str.toString();
		  return str.replace(/<[^>]*>/g, '').substring(0, 100);
		}
		
	 getPostBySlug(slug) {		
			return this.items.find(item => item.slug === slug);
		}
		
}
