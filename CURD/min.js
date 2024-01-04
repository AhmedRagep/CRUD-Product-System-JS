let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let adds = document.getElementById('adds')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')

// جلب الديف الخاصة بالرسالة
let alertMessage = document.getElementById('alert')
// جلب الرسالة
let message = document.getElementById('message')
// تحويل الديف الي مخفيه
alertMessage.style.display = 'none'

// console.log(
//   title,
//   price,
//   taxes,
//   adds,
//   discount,
//   total,
//   count,
//   category,
//   submit
// )

// متغير لتحويل المود لاستخدامه في الانشاء والتعديل
let mood = 'create';
// متغير عام فارغ لارسال بيانات المنتج من خلاله
let num;



// get total
function getTotal(){
  // لو المستخدم كتب حاجه في السعر
  if (price.value != '') {
    // جمع القيم وعلامه + لتحويل الي رقم صحيح ةتكون قبل القيمه
    let result = (+price.value + +taxes.value + +adds.value)
     - +discount.value;
    // لطباعة الناتج في الاجمالي
    total.innerHTML = result
    // وجعله باللون الاخضر
    total.style.background = '#040'
  // لو مكان السعر فارغ 
  }else{
    // حول مكان الاجمالي لفارغ 
    total.innerHTML = ''
    // وخلي لونه احمر 
    total.style.background = '#8d0303'
  }
}








// create product

// لحل مشاكل جافا سكربت
// متغير فارغ ينتظر القيمه بعد التحقق
let datapro;
// اذا وجد منتجات في المخزن
if (localStorage.products != null) {
  // ضيف المنتجات دي في المتغير اللي فوق  
  // والخطوه دي لان جافا بعد الريلود وانشاء جديد ينم حذف القديم
  datapro = JSON.parse(localStorage.products)
// لو المخزن فارغ
}else{
  // اعمل قايمه فارغه
  datapro = []
}

submit.onclick = function(){
   let newProduct = {
    title : title.value.toLowerCase(),
    price : price.value,
    taxes : taxes.value,
    adds : adds.value,
    discount: discount.value,
    total : total.innerHTML,
    count : count.value,
    category : category.value.toLowerCase(),
   }
   // لو العنوان مش فارغ انشئ او عدل 
   if (title.value != ''
   && price.value != ''
   && category.value != ''
   && count.value < 100) {
     //  لو المود بيساوي انشاء هتنشئ البيانات
     if (mood === 'create') {
       //  لو كتب عدد اكبر من واحد
       if (newProduct.count > 1) {
        // هتنشئ منتجات بالعدد اللي كتبه
        for (let i = 0; i < newProduct.count; i++) {
          datapro.push(newProduct);
        }
       // لو كتب اي حاجه ثانيه
       }else{
        // هنشئ منتج واحد فقط
        datapro.push(newProduct);
       }
       // اظهار الرسالة  
       alertMessage.style.display = 'block';
      //  جعلها باللون الاخضر
       alertMessage.classList.add('alert-success')
      //  تعديل الرسالة
       message.innerHTML = 'Created Product Successfully'
      //  اخفائها بعد 5 ثواني
       setTimeout(()=>{alertMessage.style.display='none'},5000);
      //  لو مش = انشاء 
     }else{
        // هتجيب المنتج رقم المتغير العام وهتعدله بالبيانات الجديده
        datapro[num] = newProduct;
        // بعد كده هتحول المود للانشاء
        mood = 'create';
        // وهتغير الزر للانشاء
        submit.innerHTML = 'Create';
        // هتظهر زر العدد
        count.style.display = 'block';
        // اظهر الرسالة
        alertMessage.style.display = 'block';
        // اجعلها باللون الاخضر
        alertMessage.classList.add('alert-success');
        // تعديل النص
        message.innerHTML = 'Update Product Successfully';
        // اخفائها بعد 5 ثواني
        setTimeout(()=>{alertMessage.style.display='none'},5000);      
     }
     // دالة التنظيف تعمل فقط بعد انشاء منتج
     clearData()
     
   }

  //  اضافة المنتج في القايمه لان القاموس يقبل منتج واحد
  //  datapro.push(newProduct);
  //  اضافة المنتج من القايمه في المخزن مع تحويله
   localStorage.products = JSON.stringify(datapro)
  
  // دالة عرض البيانات
   showData()
}






// clear inputs
// بعد انشاء منتج يتم حذف البيانات من الاماكن لاضافة بيانات اخري
function clearData(){
  title.value='';
  price.value='';
  taxes.value='';
  adds.value="";
  discount.value='';
  total.innerHTML = '';
  count.value=1;
  category.value='';

}




// read / show
// لعرض البيانات في صفحة العرض
function showData(){
  // عند عرض البيانات سوف تتحقق من المجموع
  getTotal()
  // متغير فارغ
  let tabel = '';
  // لجلب عدد البيانات من المخزن وعمل تكرار
  for (let i = 0; i < datapro.length; i++) {
    // في كل مره تقوم باضافة عرض المنتج في المتغير هذا
    tabel += `
    <tr>
      <td>${i+1}</td>
      <td>${datapro[i].title}</td>
      <td>${datapro[i].price}</td>
      <td>${datapro[i].taxes}</td>
      <td>${datapro[i].adds}</td>
      <td>${datapro[i].discount}</td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].category}</td>
      <td><button onclick="updatepro(${i})" id="update">Update</button></td>
      <td><button onclick="deletePro(${i})" id="delete">Delete</button></td>
    </tr>
    `
    //عند الضغط علي الزر يرسل رقم المنتج لدالة الحذف
    //<td><button onclick="deletePro(${i})" id="delete">Delete</button></td>
    // عن الضغط علي الزر يرسل رقم المنتج الي الدالة هذه لتعديله
    // <td><button onclick="updatepro(${i})" id="update">Update</button></td>
  }
  // اضافة البيانات اللتي في المتغير بداخل التابل عن طريق الايدي 
  document.getElementById('tbody').innerHTML = tabel;
  // جلب مكان زر الحذف
  let btnDelete = document.getElementById('deleteAll')
  // لو فيه منتجات
  if (datapro.length > 0) {
    // اظهر الزرار ده وضيف فيه دالة عند الضغط لحذف كل البيانات
    // وكان ضيف فيه عدد المنتجات
    btnDelete.innerHTML = `
    <button onclick="deleteAll()">Delete All (${datapro.length})</button>
    `
    // لو مفيش منتجات
  }else{
    // اخفي الزار ده
    btnDelete.innerHTML = ``
  }
}
// دالة عرض البيانات
showData()







//delete
// دالة لحذف منتج معين و هو الرقم من زر الحذف
function deletePro(i){
  // alert('You want to delete ' + i.title)
  // جلب المنتج وحذفه من القايمه
  datapro.splice(i,1);
  // حفظ القايمه مره اخري في المخزن مع ظبطها
  localStorage.products = JSON.stringify(datapro);
  // اعادة عرض البيانات
  showData();
}

// دالة حذف جميع المنتجات
function deleteAll(){
  // حذف المخزن
  localStorage.clear();
  // حذف القايمه كلها
  datapro.splice(0);
  // اعادة تحميل البيانات
  showData();
}



//update
function updatepro(i){
  // تحويل اماكن البيانات الي البيانات التي في المنتج اللي عيزين نعدلة
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  adds.value = datapro[i].adds;
  discount.value = datapro[i].discount;
  // استخدام دالة المجموع
  getTotal()
  // اخفاء زر العدد 
  count.style.display = 'none';
  category.value = datapro[i].category;
  // تحويل السم الزر للتعديل
  submit.innerHTML = 'Update';
  // وتحويل المود للتعديل
  mood = 'update';
  // اضافة رقم المنتج في المتغير العام
  num = i;
  // تحويل الصفحة الي الاعلي
  scroll({
    top: 0,
    behavior:'smooth'
  })
}




// search
// عمل مود للبحث 
let searchMood = 'title'
// هذه الدالة تجلب الايدي من الزرين عند الضغط علي احدهما
function getSearchMood(id){
  // جلب مكان الادخال البحث
  let search = document.getElementById('search')
  // لو الايدي بيساوي البحث بالعنوان
  if (id == 'searchtitle') {
    // خلي مود البحث بالعنوان
    searchMood = 'title';
    // وخلي المكان الفارغ فيه ده
    search.placeholder = "Enter product name"
    // category لو مش العنوان يعني 
  }else{
    // خلي مود البحث بالعنوان
    searchMood = 'category';
    // وخلي المكان الفارغ فيه ده
    search.placeholder = "Enter Category Name";
  }
  // خليه مفتوح عند الضغط علي زر اختيار البحث
  search.focus();
  // وخلي قيمته فارغه
  search.value = '';
  // وعيد عرض البيانات
  showData()
}
// الدالة دي بتشتغل عند كتاية اي شئ في مدخل البحث وفيها الكلام اللي كتبته
function searchData(value){
  // متغير فارغ 
  let tabel = '';
  // عمل تكرار علي البيانات جميعا
  for (let i = 0; i < datapro.length; i++) {
    // لو المود هوا البحث بالعنوان
    if (searchMood == 'title') {
        // الاسم في اي منتج يحتوي علي الكلام اللي كتبته 
        if (datapro[i].title.includes(value.toLowerCase())) {
          // ضيف ليا المنتجات اللي طلعت من البحث في المتغير
          tabel += `
              <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].adds}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updatepro(${i})" id="update">Update</button></td>
                <td><button onclick="deletePro(${i})" id="delete">Delete</button></td>
              </tr>
              `
        }
        
    // category لو المود مش الاسم يعني هيبقي 
    }else{
        // لو التاجز في اي منتج يحتوي علي الكلام اللي كتبته 
        if (datapro[i].category.includes(value.toLowerCase())) {
          // ضيف ليا المنتجات اللي طلعت من البحث في المتغير
          tabel += `
              <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].adds}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updatepro(${i})" id="update">Update</button></td>
                <td><button onclick="deletePro(${i})" id="delete">Delete</button></td>
              </tr>
              `
        }
    } 
  }
  // اضافة البيانات اللتي في المتغير بداخل التابل عن طريق الايدي 
  document.getElementById('tbody').innerHTML = tabel;
}






// clean date
