describe('pos', function () {
    var allItems;
    var inputs;

    beforeEach(function () {
        allItems = loadAllItems();
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
    });

    it('should print correct text', function () {

        spyOn(console, 'log');

        printInventory(inputs);

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';

          expect(console.log).toHaveBeenCalledWith(expectText);
    });

//function-1--------------------------------------------------------------------------------------------------------
        it('if same, add count',function(){
            var str='ITEM000001'
            var inputs_count=[{barcode:'ITEM000001',count:1}]
            var fs=0
            find_same(str,inputs_count,fs)
            var a=inputs_count
            var expectarray=[{barcode:'ITEM000001',count:2}]
            expect(a).toEqual(expectarray)
        })

        it('if not same, add barcode and count',function(){
            var str='ITEM000002'
            var inputs_count=[{barcode:'ITEM000001',count:1}]
            var fs=0
            find_same(str,inputs_count,fs)
            var a=inputs_count
            var expectarray=[{barcode:'ITEM000001',count:1},{barcode:'ITEM000002',count:1}]
            expect(a).toEqual(expectarray)
        })

//function-2--------------------------------------------------------------------------------------------------------
        it('with -, if same, add count',function(){
            var str='ITEM000001-2'
            var inputs_count=[{barcode:'ITEM000001',count:1}]
            var fs=0
            another_find_same(str,inputs_count,fs)
            var a=inputs_count
            var expectarray=[{barcode:'ITEM000001',count:3}]
            expect(a).toEqual(expectarray)
        })

        it('with -,if not same, add barcode and count',function(){
            var str='ITEM000002-2'
            var inputs_count=[{barcode:'ITEM000001',count:1}]
            var fs=0
            another_find_same(str,inputs_count,fs)
            var a=inputs_count
            var expectarray=[{barcode:'ITEM000001',count:1},{barcode:'ITEM000002',count:2}]
            expect(a).toEqual(expectarray)
        })

//function-3----------------------------------------------------------------------------------------------------------
    it('should count the inputs',function(){
        var a=count_inputs(inputs)
        var expectarray=[{barcode:'ITEM000001',count:5},{barcode:'ITEM000003',count:2},{barcode:'ITEM000005',count:3}]
        expect(a).toEqual(expectarray)
    })

//function-4-----------------------------------------------------------------------------------------------------------
    it('should get the order information',function(){
       var inputs_count=[{barcode:'ITEM000001',count:5},{barcode:'ITEM000003',count:2},{barcode:'ITEM000005',count:3}]
       var a=get_order_info(inputs_count,allItems)
       var expectarray=[{barcode:'ITEM000001',name:'雪碧',unit:'瓶',count:5,price:3,total:15},
                        {barcode:'ITEM000003',name:'荔枝',unit:'斤',count:2,price:15,total:30},
                        {barcode:'ITEM000005',name:'方便面',unit:'袋',count:3,price:4.5,total:13.5}]
       expect(a).toEqual(expectarray)
    })

//function-5----------------------------------------------------------------------------------------------------------
    it('should get the gift information',function(){
//    order_info=[{barcode:'ITEM000001',name:'雪碧',unit:'瓶',count:5,price:3,total:15},
//                    {barcode:'ITEM000003',name:'荔枝',unit:'斤',count:2,price:15,total:30},
//                    {barcode:'ITEM000005',name:'方便面',unit:'袋',count:3,price:4.5,total:13.5}]
    var a=get_gift_info(order_info,promotion)
    var expectarray=[{barcode:'ITEM000001',name:'雪碧',unit:'瓶',count:1,total:3},
                     {barcode:'ITEM000005',name:'方便面',unit:'袋',count:1,total:4.5} ]
    expect(a).toEqual(expectarray)
    })

//function-6---------------------------------------------------------------------------------------------------------
    it('should minus order total with gift total',function(){
//    order_info=[{barcode:'ITEM000001',name:'雪碧',unit:'瓶',count:5,price:3,total:15},
//                    {barcode:'ITEM000003',name:'荔枝',unit:'斤',count:2,price:15,total:30},
//                    {barcode:'ITEM000005',name:'方便面',unit:'袋',count:3,price:4.5,total:13.5}]
//    gift_info=[{barcode:'ITEM000001',name:'雪碧',unit:'瓶',count:1,total:3},
//                   {barcode:'ITEM000005',name:'方便面',unit:'袋',count:1,total:4.5} ]
    var a=minus_gift_price(order_info,gift_info)
    var expectarray=[{barcode:'ITEM000001',name:'雪碧',unit:'瓶',count:5,price:3,total:12},
                     {barcode:'ITEM000003',name:'荔枝',unit:'斤',count:2,price:15,total:30},
                     {barcode:'ITEM000005',name:'方便面',unit:'袋',count:3,price:4.5,total:9}]
    expect(a).toEqual(expectarray)
    })

//function-7-----------------------------------------------------------------------------------------------------------
    it('caculate the total of order and gift',function(){
//    order_info_final=[{barcode:'ITEM000001',name:'雪碧',unit:'瓶',count:5,price:3,total:12},
//                         {barcode:'ITEM000003',name:'荔枝',unit:'斤',count:2,price:15,total:30},
//                         {barcode:'ITEM000005',name:'方便面',unit:'袋',count:3,price:4.5,total:9}]
//    gift_info=[{barcode:'ITEM000001',name:'雪碧',unit:'瓶',count:1,total:3},
//                   {barcode:'ITEM000005',name:'方便面',unit:'袋',count:1,total:4.5} ]
    var a=caculate_price(order_info_final,gift_info)
    var expectobject={Sum:51,gifts_price:7.5}
    expect(a).toEqual(expectobject)
    })

//function-8------------------------------------------------------------------------------------------------------------
    it('Receipt',function(){
//    order_info_final=[{barcode:'ITEM000001',name:'雪碧',unit:'瓶',count:5,price:3,total:12},
//                         {barcode:'ITEM000003',name:'荔枝',unit:'斤',count:2,price:15,total:30},
//                         {barcode:'ITEM000005',name:'方便面',unit:'袋',count:3,price:4.5,total:9}]
//    gift_info=[{barcode:'ITEM000001',name:'雪碧',unit:'瓶',count:1,total:3},
//                   {barcode:'ITEM000005',name:'方便面',unit:'袋',count:1,total:4.5} ]
//    caculate={Sum:51,gifts_price:7.5}
    var a=print_Receipt(order_info_final,gift_info,caculate)
    var expectText=
                '***<没钱赚商店>购物清单***\n' +
                '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
                '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
                '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
                '----------------------\n' +
                '挥泪赠送商品：\n' +
                '名称：雪碧，数量：1瓶\n' +
                '名称：方便面，数量：1袋\n' +
                '----------------------\n' +
                '总计：51.00(元)\n' +
                '节省：7.50(元)\n' +
                '**********************';
    expect(a).toEqual(expectText)
    })
});

