function printInventory(inputs)
{
//console.log(JSON.stringify(inputs));
 var a=count_inputs(inputs);
 console.log(a);
//TODO: Please write code in this file.
}
var count_inputs=function(inputs)
{
    var inputs_count=[]
    var a=0
    inputs_count[a]={barcode:'',count:0}
    var chenzhong=[]
    var fs
    for(var i=0;i<inputs.length;i++)
    {
      var str=inputs[i]
      fs=0
      if (str.indexOf('-')==-1)
      {
          for(var j=0;j<a;j++)
          {

            if(inputs[i]==inputs_count[j].barcode)
            {
            inputs_count[j].count++
            fs=1
            }
          }
          if (fs==0)
          {
           inputs_count[a]={barcode:'',count:0}
           inputs_count[a].barcode=inputs[i]
           inputs_count[a].count=1
           a++
          }
      }
      else
      {
          chenzhong=str.split('-')
          for(var j=0;j<a;j++)
            {
             if(chenzhong[0]==inputs_count[j].barcode)
             {
              inputs_count[j].count+=parseInt(chenzhong[1])
              fs=1
             }
             }
             if(fs==0)
             {
              inputs_count[a]={barcode:'',count:0}
              inputs_count[a].barcode=chenzhong[0]
              inputs_count[a].count=parseInt(chenzhong[1])
              a++
             }

      }
    }

    var order_info=[]
    var b=0
    allItems = loadAllItems();
    order_info[b]={barcode:'',name:'',unit:'',count:0,price:'',total:''}
    for(i=0;i<inputs_count.length;i++)
    {
      for(j=0;j<allItems.length;j++)
       {
            if (inputs_count[i].barcode==allItems[j].barcode)
            {
              order_info[b]={barcode:'',name:'',unit:'',count:0,price:'',total:''}
              order_info[b].barcode=allItems[j].barcode
              order_info[b].name=allItems[j].name
              order_info[b].unit=allItems[j].unit
              order_info[b].count=inputs_count[i].count
              order_info[b].price=allItems[j].price
              order_info[b].total=order_info[b].price*order_info[b].count
              b++
            }
       }
    }

    var gift_info=[]
    var c=0
    promotion=loadPromotions()
    gift_info[c]={barcode:'',name:'',unit:'',count:0,total:''}
    for(i=0;i<order_info.length;i++)
    {
      for(j=0;j<promotion[0].barcodes.length;j++)
       {
            if (order_info[i].barcode==promotion[0].barcodes[j])
            {
              gift_info[c]={barcode:'',name:'',unit:'',count:0,total:''}
              gift_info[c].barcode=order_info[i].barcode
              gift_info[c].name=order_info[i].name
              gift_info[c].unit=order_info[i].unit
              gift_info[c].count=parseInt(order_info[i].count/3)
              gift_info[c].total=gift_info[c].count*order_info[i].price
              c++
            }
       }
    }

   for(i=0;i<order_info.length;i++)
   {
     for(j=0;j<gift_info.length;j++)
     {
       if(order_info[i].barcode==gift_info[j].barcode)
       {
         order_info[i].total=order_info[i].price*(order_info[i].count-gift_info[j].count)
       }
     }
   }

   var caculate={Sum:0,jiesheng:0}
   for(i=0;i<order_info.length;i++)
   {
     caculate.Sum+=order_info[i].total
   }
   for(i=0;i<gift_info.length;i++)
   {
     caculate.jiesheng+=gift_info[i].total
   }

   var Receipt='***<没钱赚商店>购物清单***\n'
   for(i=0;i<order_info.length;i++)
   {
      Receipt+='名称：'+order_info[i].name+'，数量：'+order_info[i].count+order_info[i].unit+'，单价：'+order_info[i].price.toFixed(2)+'(元)'+'，小计：'+order_info[i].total.toFixed(2)+'(元)\n'
   }
   Receipt+='----------------------\n'+'挥泪赠送商品：\n'
   for(i=0;i<gift_info.length;i++)
   {
     Receipt+='名称：'+gift_info[i].name+'，数量：'+gift_info[i].count+gift_info[i].unit+'\n'
   }
   Receipt+='----------------------\n' +'总计：'+caculate.Sum.toFixed(2)+'(元)\n'+'节省：'+caculate.jiesheng.toFixed(2)+'(元)\n'+'**********************'
return Receipt
}
