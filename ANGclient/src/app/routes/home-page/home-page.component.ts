import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../../services/merchant/merchant.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  providers: [ MerchantService ]
})
export class HomePageComponent implements OnInit {
  private merchantCollection: Array<any>
  private merchantCollectionRaw: Array<any>
  private categoriesCollection: Array<any>
  private categoriesCollectionSlug: Array<string>
  public activeCategory: string

  constructor(
    private MerchantService: MerchantService
  ) {
    this.categoriesCollectionSlug = []
    this.categoriesCollection = []
    this.activeCategory = 'all'
  }

  private getMerchantlist = () => {
    this.MerchantService.readAllItems()
    .then(apiResponse => {
      this.getMerchantCategories(apiResponse.data)
      this.merchantCollection = apiResponse.data
      this.merchantCollectionRaw = apiResponse.data
    })
    .catch( apiResponse => console.error(apiResponse))
  }

  private getMerchantCategories = (data: any) => {
    data.map( item => {
      item.category.isActive = false
      if (this.categoriesCollectionSlug.indexOf(item.category.slug) === -1) {
        this.categoriesCollectionSlug.push(item.category.slug)
        this.categoriesCollection.push(item.category)
      }
    })
    console.table(data[0].category);
  }

  public sortMerchant = (cat: any) => {
    this.activeCategory = cat.slug
    const tempArray = [];
    this.merchantCollectionRaw.map(item => { 
      if (item.category.slug === cat.slug) {
        tempArray.push(item)
      }
    })
    this.merchantCollection = tempArray;
  }

  ngOnInit() {
    this.getMerchantlist()
  }

}
