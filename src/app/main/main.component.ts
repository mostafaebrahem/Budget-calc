import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isEdit:boolean=false;
  desc:string='';
  currIndex:number=-1;
  qua:number|null=null;
  cartona:any[];
  result:number=0;
  income:number=0;
  outcome:number=0;
  budgetForm:FormGroup=new FormGroup({
      amount:new FormControl(null,[Validators.required]),
      description:new FormControl(null,[Validators.required])
  })
  budgetUpdateForm:FormGroup=new FormGroup({
      amount:new FormControl(null,[Validators.required]),
      description:new FormControl(null,[Validators.required])
  })
  constructor() {
    if(localStorage.getItem('budget')!=null){
      let a:any=localStorage.getItem('budget');
       this.cartona =JSON.parse(a) ;
    }else{
      this.cartona=[];
    }

  }

  ngOnInit(): void {
    this.summation();
    this.incomeCalculate();
  }
   budgetSubmit(formInfo:FormGroup){
    console.log('updaaaaate',formInfo);
    this.cartona.push(formInfo.value);
    console.log(this.cartona);
     let y= JSON.stringify(this.cartona)
    localStorage.setItem('budget',y);
    this.result=0;
    this.summation();
    this.incomeCalculate();


    }
    deleteItem(item:number){
      this.cartona.splice(item,1);
      localStorage.setItem('budget',JSON.stringify(this.cartona))
      this.result=0;
      this.summation();
      this.incomeCalculate();
    }
    summation(){
      for(let i=0;i<this.cartona.length;i++){
        this.result+=this.cartona[i].amount;
      }
    }
    updateStatus(){
      this.isEdit=!this.isEdit;
      console.log(this.isEdit)

    }
    update(index:number){
      this.desc=this.cartona[index].description;
      this.qua=this.cartona[index].amount;
      console.log(this.cartona[index].amount);
      console.log(this.cartona[index].description);
      this.currIndex=index;

      // this.deleteItem(index)

    }
    updateDone(){
      setTimeout(()=>{ this.qua=null;
      this.desc='';
        this.updateStatus();
        this.deleteItem(this.currIndex);
        this.incomeCalculate();},0);

    }
    incomeCalculate(){
        let income:number=0;
        let outcome:number=0;
      for(let i=0;i<this.cartona.length;i++){

        if(this.cartona[i].amount>=0){
            console.log(this.income)
          income+=this.cartona[i].amount;
          this.income=income;

        }else{
          this.outcome=this.cartona[i].amount;
          this.outcome=outcome;
        }
      }
      console.log(this.income/5);
    }

}
