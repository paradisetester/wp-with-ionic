import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../shared/data.service';
import {environment} from '../../environments/environment';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { HtmlheadService } from '../../providers/seo/seo';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

    item: any;   
    video: any;   
	items: any[];
	dateFormat = environment.dateFormat;
	skeletion=true;
	section_web=false;
	
    constructor(private route: ActivatedRoute, public dataService: DataService,private http: Http,private sanitizer: DomSanitizer, public htmlheadService:HtmlheadService) { }

    ngOnInit() {
		
		this.http.get('../../assets/js/all-posts.json')
            .map((response: Response) => response.json())
            .subscribe(data => {
					this.skeletion=false;
					this.section_web=true;
					this.items = data;
					const itemSlug = this.route.snapshot.paramMap.get('slug');
					const slug = itemSlug.split("-",1);					
					this.item = this.getPostBySlug(slug[0]);	
					this.item.content = this.urlify(this.item.content);
					if(this.item.videolink){
						console.log(this.item.videolink)
						this.video = this.cleanURL('https://www.youtube.com/embed/'+this.item.videolink+'?feature=oembed'); 
					}
					
		/*************sco service**************/
					var title=this.item.title;
					var description=this.strip_html_tags(this.item.content);
					var keywords=this.strip_html_tags(this.item.content);					
					var img=this.item.fimg_url;
					
					this.htmlheadService.addMeta(title,description,keywords,img);
					this.htmlheadService.addMetaOg(title,description,keywords,img);
					this.htmlheadService.addMetaTwitter(title,description,keywords,img);
					
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

urlify(text) {
    var urlRegex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    return text.replace(urlRegex, function(url) {
        return '';
    })
    
}

 cleanURL(url: string) {	
	var video = '<div style="overflow:auto;-webkit-overflow-scrolling:touch">\
    <iframe width="625" height="352" src="'+url+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>\
	</div>';
		return video;
  }
	

	 getPostBySlug(id) {		
        return this.items.find(item => item.id == id);
    }
	

}