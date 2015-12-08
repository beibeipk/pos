function find_same(str,str_count,check){
   for(var j=0;j<str_count.length;j++)  {
       if(str==str_count[j].barcode){
          str_count[j].count++
          check=1
       }
   }
   if (check==0) {
       str_count.push({barcode:str,count:1})
   }
}

function another_find_same(str,str_count,check){
    chenzhong=str.split('-')
    for(var j=0;j<str_count.length;j++){
        if(chenzhong[0]==str_count[j].barcode){
            str_count[j].count+=parseInt(chenzhong[1])
            check=1
        }
    }
    if(check==0){
        str_count.push({barcode:chenzhong[0],count:parseInt(chenzhong[1])})
    }
}

function count_inputs(inputs){
    var inputs_count=[],chenzhong=[],fs
    for(var i=0;i<inputs.length;i++){
        fs=0
        if (inputs[i].indexOf('-')==-1){
            find_same(inputs[i],inputs_count,fs)
        }
        else{
            another_find_same(inputs[i],inputs_count,fs)
        }
    }
    return inputs_count
}

function get_order_info(inputs_count,allItems){
    var order_info=[]
    for(i=0;i<inputs_count.length;i++) {
        for(j=0;j<allItems.length;j++) {
            if (inputs_count[i].barcode==allItems[j].barcode){
                order_info.push({barcode:allItems[j].barcode,name:allItems[j].name,unit:allItems[j].unit,count:inputs_count[i].count,price:allItems[j].price,total:allItems[j].price*inputs_count[i].count})
            }
        }
    }
    return order_info
}

function get_gift_info(order_info,promotion){
    var gift_info=[]
    for(i=0;i<order_info.length;i++){
        for(j=0;j<promotion[0].barcodes.length;j++)  {
            if (order_info[i].barcode==promotion[0].barcodes[j])   {
                gift_info.push({barcode:order_info[i].barcode,name:order_info[i].name,unit:order_info[i].unit,count:parseInt(order_info[i].count/3),total:parseInt(order_info[i].count/3)*order_info[i].price})
            }
        }
    }
    return gift_info
}

function minus_gift_price(order_info,gift_info){
    var order_info_final=order_info
    for(i=0;i<order_info.length;i++)  {
        for(j=0;j<gift_info.length;j++)  {
            if(order_info_final[i].barcode==gift_info[j].barcode)  {
                order_info_final[i].total=order_info_final[i].price*(order_info_final[i].count-gift_info[j].count)
            }
        }
    }
   return order_info_final
}

function caculate_price(order_info_final,gift_info){
    var caculate={Sum:0,gifts_price:0}
    for(i=0;i<order_info_final.length;i++){
        caculate.Sum+=order_info_final[i].total
    }
    for(i=0;i<gift_info.length;i++){
        caculate.gifts_price+=gift_info[i].total
    }
    return caculate
}

function print_Receipt(order_info_final,gift_info,caculate){
    var Receipt='***<没钱赚商店>购物清单***\n'
    for(i=0;i<order_info_final.length;i++)  {
        Receipt+='名称：'+order_info_final[i].name+'，数量：'+order_info_final[i].count+order_info_final[i].unit+'，单价：'+order_info_final[i].price.toFixed(2)+'(元)'+'，小计：'+order_info_final[i].total.toFixed(2)+'(元)\n'
    }
    Receipt+='----------------------\n'+'挥泪赠送商品：\n'
    for(i=0;i<gift_info.length;i++) {
        Receipt+='名称：'+gift_info[i].name+'，数量：'+gift_info[i].count+gift_info[i].unit+'\n'
    }
    Receipt+='----------------------\n' +'总计：'+caculate.Sum.toFixed(2)+'(元)\n'+'节省：'+caculate.gifts_price.toFixed(2)+'(元)\n'+'**********************'
    return Receipt
}

function printInventory(inputs)
{
//console.log(JSON.stringify(inputs));
 allItems = loadAllItems();
 promotion=loadPromotions();
 inputs_count=count_inputs(inputs);
 order_info=get_order_info(inputs_count,allItems)
 gift_info=get_gift_info(order_info,promotion)
 order_info_final=minus_gift_price(order_info,gift_info)
 caculate=caculate_price(order_info_final,gift_info)
 Receipt=print_Receipt(order_info_final,gift_info,caculate)
 console.log(Receipt);
}
