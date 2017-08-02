import { Injectable } from '@angular/core';
declare var $: any;

@Injectable()
export class ValidationService {
     
validation(inBlock) 
{
	var blnk :any	= [];
	var eMail 	= [];
	var name 	= [];
	var mobile	= [];
	var num		= [];
	var err = 0;
	
	/*$(inBlock + ' .blnk').each((i,val)=>{
	    blnk.push(document.querySelectorAll('div>input')[i+1].id);
    });
    
	console.log(blnk);*/
	
	$(inBlock + ' .blnk').each((i,val)=>{
	    blnk.push($(inBlock + ' .blnk').prop('id'));
    });
	
	$(inBlock + ' .eMail').each(()=>{
		eMail.push($(this).attr('id'));
	});
	
	$(inBlock + ' .name').each(()=>{
		name.push($(this).attr('id'));
	});
	
	$(inBlock + ' .mobile').each(()=>{
		mobile.push($(this).attr('id'));
	});
	
	$(inBlock + ' .num').each(()=>{
		num.push($(this).attr('id'));
	});
	
	for(var i = 0; i < blnk.length; i++)
	{
		if( $.trim($('#'+blnk[i]).val()) == '')
		{
			$("#err_"+blnk[i]).html("<span class='text-danger'>required!</span>");
			$("#"+blnk[i]).addClass('required');
			err=1;
		}
		else
		{
			$("#err_"+blnk[i]).empty();
			$("#"+blnk[i]).removeClass('required');
		}
	}
	for(var i = 0; i < eMail.length; i++)
	{
		var chkMail = this.checkEmail(eMail[i]);
		if(chkMail != true)
		{
			err++;
		}
		
	}
	
	for(var i = 0; i < name.length; i++)
	{
		var chkName = this.checkNameWithSpace(name[i]);
		if(chkName != true)
		{
			err++;
		}
	}
	
	for(var i = 0; i < mobile.length; i++)
	{
		var chkMobile = this.checkMobile(mobile[i]);
		if(chkMobile != true)
		{
			err++;
		}
	}
	
	for(var i = 0; i < num.length; i++)
	{
		var chkNum = this.checkNumber(num[i]);
		if(chkNum != true)
		{
			err++;
		}
	}
	
	if(err > 0)
	{
		return false;
	}
	else
	{
		return true;
	}
}

checkEmail(eId) 
{	
	var Email = $.trim($('#' + eId).val()), filter = /^[A-z0-9]+[A-z0-9._-]+@[A-z0-9]+[A-z0-9.-]+\.[A-z]{2,4}$/;
	
	if (Email != '') 
	{
		if (!filter.test(Email)) 
		{
			$('#err_' + eId).html("<span class='text-danger'>Invalid email!</span>");
			$("#"+eId).addClass('required');
			return false;
		} 
		else 
		{
			$('#err_' + eId).html("");
			$("#"+eId).removeClass('required');
			$('#err_' + eId).css('border-color','#ccc');
			return true;
		}
	} 
	else 
	{
		return true;
	}
}
 checkName(eId) 
{	
	var Name = $.trim($('#' + eId).val()), filter = /^[a-zA-Z]+$/;
	if (Name != '') 
	{
		if (!filter.test(Name)) 
		{
			$('#err_' + eId).html("<span class='text-danger'>Only alphabets are allowed!</span>");
			$("#"+eId).addClass('required');
			return false;
		} 
		else 
		{
			$('#err_' + eId).html("");
			$("#"+eId).removeClass('required');
			return true;
		}
	} 
	else 
	{
		return true;
	}
}
 checkNameWithSpace(eId) 
{	
	var Name = $.trim($('#' + eId).val()), filter = /^[a-zA-Z ]*$/;
	
	if (Name != '') 
	{
		if (!filter.test(Name)) 
		{
			$('#err_' + eId).html("<span class='text-danger'>Only alphabets are allowed!</span>");
			$("#"+eId).addClass('required');
			return false;
		} 
		else 
		{
			$('#err_' + eId).html("");
			$("#"+eId).removeClass('required');
			return true;
		}
	} 
	else 
	{
		return true;
	}
}
 checkMobile(eId) 
{	
	var mobile = $.trim($('#' + eId).val()), filter = /^[789]\d{9}$/;
	
	if (mobile != '') 
	{
		if (!filter.test(mobile)) 
		{
			$('#err_' + eId).html("<span class='text-danger'>Invalid mobile no.!</span>");
			$("#"+eId).addClass('required');
			return false;
		} 
		else 
		{
			$('#err_' + eId).html("");
			$("#"+eId).removeClass('required');
			return true;
		}
	} 
	else 
	{
		return true;
	}
}

 checkNumber(eId) {	
	var num = $.trim($('#' + eId).val()), filter = /^\d+$/;
	
	if (num != '') 
	{
		if (!filter.test(num)) 
		{
			$('#err_' + eId).html("<span class='text-danger'>Only numbers allow here!</span>");
			$('#' + eId).addClass("required");
			return false;
		} 
		else 
		{
			$('#err_' + eId).html("");
			$('#' + eId).removeClass("required");
			return true;
		}
	} 
	else 
	{
		return true;
	}

       
         
    }
}