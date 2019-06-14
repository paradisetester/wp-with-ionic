import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs';

const ENDPOINT_URL = environment.endpointURL;
@Injectable({
    providedIn: 'root'
})
export class DataService {
   
	items: any[] = [];
	pages: any[] = [];
    page = 1;
    totalPages = 1;
    constructor(private http: HttpClient) { }
	
	
    /**
     * Gets a page of posts or all posts formerly fetched
     */
     getPosts(): any {       
        if (this.items.length > 0) {
            return of(this.items);
        } else {
            return this.http.get(ENDPOINT_URL + 'wp/v2/posts?_embed', {observe: 'response'})
                .map(this.processPostData, this);
        }
    }
    /**
     * Gets the next page of posts
     */
    getMorePosts(): any {
        this.page++;
        return this.http.get(ENDPOINT_URL + 'wp/v2/posts?_embed&page=' + this.page, {observe: 'response'})
            .map(this.processPostData, this);
    }
	
	
	
	// A place for post-processing, before making the fetched data available to view.
    processPostData(resp: HttpResponse<any[]>) {
        this.totalPages = +resp.headers.get('X-WP-TotalPages'); // unary (+) operator casts the string to a number
        resp.body.forEach((item: any) => {
            this.items.push(item);
        });
        return this.items;
    }
	
   getPostBySlug(slug) {
		console.log(this.items);
        return this.items.find(item => item.slug === slug);
    }
	/**
     * Gets a page by slug fetched
     */
     getPages(): any {       
        if (this.pages.length > 0) {
            return of(this.pages);
        } else {
            return this.http.get(ENDPOINT_URL + 'wp/v2/pages?_embed', {observe: 'response'})
                .map(this.processPageData, this);
        }
    }
    // A place for post-processing, before making the fetched data available to view.
    processPageData(resp: HttpResponse<any[]>) {
        this.totalPages = +resp.headers.get('X-WP-TotalPages'); // unary (+) operator casts the string to a number
        resp.body.forEach((item: any) => {
            this.pages.push(item);
        });
        return this.items;
    } 
	
	getPageBySlug(slug) {	
	
        return this.pages.find(item => item.slug === slug);
    }
	 
   
	
    hasMorePosts() {
        return this.page < this.totalPages;
    }
	
	
	sendMail(data) {
		var headers = new Headers();
		var options = {
		  headers: { 'Content-Type': ['application/json'] }
		};
		
		return new Promise((resolve, reject) => {		  
			this.http.post(ENDPOINT_URL+'myplugin/v1/sendMail', JSON.stringify(data),options)
			  .subscribe(res => {
				resolve(res);
			  }, (err) => {
				reject(err);
			  });
		});
	}


	 allPost() { 
			return new Promise((resolve, reject) => {		  
				this.http.get('../../assets/js/all-posts.json')
				  .subscribe(res => {
					resolve(res);
				  }, (err) => {
					reject(err);
				  });
			});
		}
	
	
}