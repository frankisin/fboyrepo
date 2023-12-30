import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LostbornService {

  private apiUrl = 'https://localhost:7067'; // Update this with your API URL

  constructor(private http: HttpClient) { }

  //LostBorn
  getAllMembers(): Observable<any[]> { 
    return this.http.get<any[]>(`${this.apiUrl}/LostBorn`);

  }
  getMember(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/LostBorn/${id}`);
  }

  addMember(member: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/LostBorn`, member);
  }

  updateMember(member: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/LostBorn`, member);
  }

  deleteMember(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/LostBorn/${id}`);
  }

  //Product
  getAllProductData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Product`);
  }

  getProductData(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Product/${id}`);
  }

  addProductData(product: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Product`, product);
  }

  updateProductData(product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Product`, product);
  }

  deleteProductData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Product/${id}`);
  }

}
