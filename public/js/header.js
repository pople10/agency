         const show___menu = () =>{
            var lfnvb=document.getElementById('lft_nvb');
            if(lfnvb.style.left=="-80vw"||lfnvb.style.left=="") lfnvb.style.left=0;
            else lfnvb.style.left="-80vw";
        }
        const afterLoading= () =>{
            document.getElementById('top___navbr').style.top=0;
            const header_=document.getElementsByClassName("backgroun___header")[0];
            header_.style.borderBottomLeftRadius="12%";
            header_.style.transform="rotate(-7deg)";
            document.getElementsByClassName("logo____container__img__")[0].style.left=0;
            document.getElementsByClassName("header___container__el1")[0].style.opacity=1;
            
        }
        $(document).ready(()=>{
        $.ajax({type:"POST",url:"/api/visit"});
            setTimeout(() => {afterLoading();}, 200);
        });
        
        const TextAnimation = (e) => {
            e.classList.add("animated___text");
        }
        const TextAnimation_out = (e) => {
            e.classList.remove("animated___text");
        }
       