//*query framework
(function () {
  let dc = {
    query: (e) => {
      return query(document, e);
    },
    queries: (e) => {
      return queries(document, e);
    },
    id: (e) => {
      return getId(document, e);
    }
  }
  function getId(ele, trgt) {
    return querify(ele.getElementById(trgt))
  }
  function query(ele, trgt) {
    return querify(ele.querySelector(trgt))
  }
  function queries(ele, trgt) {
    return querify(ele.querySelectorAll(trgt))
  }

  function querify(ele) {
    if (!ele) return
    ele.query = (e) => query(ele, e);
    ele.queries = (e) => queries(ele, e);
    return ele
  }
  window.dc = dc;
})()

// Add smooth scrolling to all links
$("a").on('click', function (event) {
  if (this.hash !== "") {
    event.preventDefault();
    var hash = this.hash;
    window.location.hash = hash;

    $('html, body').animate({
      scrollTop: $(hash).offset().top + -30
    }, 900, function () {

    });
  }
});

//copy spot player code
dc.queries('#spotPlayer i').forEach(item=>{
  item.onclick = () => {
    let copyText = item.parentElement.querySelector('.code').innerHTML;
    navigator.clipboard.writeText(copyText);
    item.classList.add('copied');
    setTimeout(() => {
      item.classList.remove('copied')
    }, 3000);
  }
})

//updload practice
(function () {

  //input adder 
  dc.queries('.practice i.fa-plus-circle').forEach(item => {
    item.addEventListener('click', () => {
      //clone the last input in the secition
      let clone = item.parentElement.querySelectorAll('.input');
      clone = clone[clone.length - 1];
      clone = clone.cloneNode(true);

      //increase index of clone by one
      let cloneFor = clone.querySelector('label').getAttribute('for');
      let cloneIndex = cloneFor[cloneFor.length - 1];

      let regex = new RegExp(`${cloneIndex}$`)
      let newFor = cloneFor.replace(regex, parseInt(cloneIndex) + 1);

      clone.querySelector('label').setAttribute('for', newFor);
      clone.querySelector('input').id = newFor;

      //set events and inner values of clone
      inputChangeHandler(clone.querySelector('input'));
      clone.querySelector('input').value = '';
      clone.querySelector('span').innerHTML = '';
      removerEvnt(clone.querySelector('i.fa-times'))

      clone.classList.add('hidden')
      item.parentElement.appendChild(clone);
      setTimeout(() => { document.querySelector('.input.hidden').classList.remove('hidden'); }, 10);
    })
  })

  //input remover
  function removerEvnt(item) {
    item.onclick = () => {
      let inputs = item.parentElement.parentElement.querySelectorAll('.input');
      if (inputs.length == 1) {
        inputs[0].value = '';
        item.parentElement.querySelector('span').innerHTML = '';
        return
      }
      item.parentElement.classList.add('hidden');
      setTimeout(() => { item.parentElement.remove() }, 200);
    }
  }
  dc.queries('.practice i.fa-times').forEach(item => {
    removerEvnt(item)
  })

  //put the name of uploaded file into the box!
  function inputChangeHandler(item) {
    item.addEventListener('change', (e) => {
      item.parentElement.querySelector('span').innerHTML = e.target.value;
    })
  }
  dc.queries('.practice input').forEach(item => { inputChangeHandler(item) })

  //clear all
  function clearPracticeForm() {
    dc.queries('.practice .input label span').forEach(item=>{
      item.innerHTML = '';
    })
    dc.query('.practice').reset();
    dc.queries('.practice .part').forEach(item=>{
      let inputs= item.querySelectorAll('.input');
      if (inputs.length > 1) {

        inputs.forEach((i, index)=>{
          if (index == inputs.length-1) return
          i.remove();
        })
        console.log(item)
        
        // for (let m=0; m < inputs.length; m++) {
        //   console.log(inputs[m])
        // }
      }
    })
  }

  //upload submit
  dc.query('.practice').onsubmit = (e) => {
    e.preventDefault();
    clearPracticeForm();
    alert('form submitted!')
  }
})()