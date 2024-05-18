<head>
 <style type="text/css" title="x-apple-mail-formatting"></style> 
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> 
 <meta name="viewport" content="width=device-width, initial-scale=1">
 <title>Reset your password</title> 

 @include('mails.css')
</head> 
<body bgcolor="#f5f8fa" style="-moz-box-sizing: border-box; -ms-text-size-adjust: 100%; -webkit-box-sizing: border-box;  -webkit-text-size-adjust: 100%; margin: 0; background: #f5f8fa !important; background-color: #f5f8fa !important; box-sizing: border-box;   font-size: 14px; min-width: 100%; width: 100% !important;"> 
 <span class="preheader" style="-moz-hyphens:none;-ms-hyphens:none;-webkit-hyphens:none;color:transparent;display:none!important;font-size:1px;hyphens:none;line-height:1px;max-height:0;max-width:0;mso-hide:all!important;opacity:0;overflow:hidden;visibility:hidden;word-break:keep-all">Reset your password</span>
 <table bgcolor="#f5f8fa" class="body" style=" background: #f5f8fa !important; background-color: #f5f8fa !important; height: 100%;   width: 100%;">
  <tbody>
   <tr> 
    <td align="center" class="center" style="   line-height: 1.5;  padding: 0;   ; word-wrap: break-word" valign="top"> 
     <center  style="  min-width: 580px; width: 100%; "> 
      <table align="center" class="container float-center" style="border-spacing: 0;   width: 580px; "> 
       <tbody> 
        <tr> 
         <th class="expander" style="line-height: 1.5; padding: 0 !important; visibility: hidden; ">&nbsp;</th> 
        </tr> 
       </tbody> 
      </table>  
      <table align="center" class="container float-center" style=" border-spacing: 0; padding: 0; text-align: left;  width: 580px; "> 
       <tbody> 
        <tr> 
         <td style="line-height: 1.5;  padding: 0;   ; word-wrap: break-word">
          <table class="row content content-top" style=" background-color: #fefefe; border-radius: 6px 6px 0 0 !important; border-spacing: 0;   padding: 0;width: 100%; "> 
           <tbody> 
            <tr> 
             <th class="small-12 large-12 columns first last" style="padding: 0; padding-left: 35px; padding-right: 35px;  width: 545px; "> 
              <table style=" border-spacing: 0;  padding: 0;   width: 100%; "> 
               <tbody> 
                <tr> 
                 <th style="padding: 0;  " > 
                  <table class="spacer" style=" border-spacing: 0;  padding: 0;   width: 100%; "> 
                   <tbody> 
                    <tr> 
                     <td height="35px" style=" line-height: 35px;  mso-line-height-rule: exactly; padding: 0;">&nbsp;
                     </td> 
                    </tr> 
                   </tbody> 
                  </table> 
                  <center  style="  min-width: 475px; width: 100%; "><img align="center" alt="Find Surrogate Logo" class="float-center" src="http://parenting.msaadjaved.com/logo.png" style="display: block;  height: auto !important;   max-width: 200px; text-align: center;  width: auto !important; max-height: 100px; " height="100"></center> 
                  <table class="spacer" style=" border-spacing: 0;  padding: 0;   width: 100%; "> 
                   <tbody> 
                    <tr> 
                     <td height="20px" style=" line-height: 20px;  mso-line-height-rule: exactly; padding: 0;">&nbsp;
                     </td> 
                    </tr> 
                   </tbody> 
                  </table> 
                  <h3 style=" text-align: center; color: #164D74;  font-size: 24px; font-weight: 400;  line-height: 1.5; margin: 0; margin-bottom: 15px; ">Reset your password</h3> 
                  <h3 style=" text-align: left; color: #164D74;  font-size: 18px; font-weight: 400;  line-height: 1.5; margin: 0; margin-bottom: 5px; ">Hi {{ $user->name }},</h3> 
                  <p class="mb0" style="text-align: left; font-size: 15px; height: 15px;   line-height: 1; margin: 0; margin-bottom: 0 !important; ">&nbsp;</p> 
                  <p class="mb0" style="text-align: left; font-weight: normal; color: #164D74;     line-height: 1.5; margin: 0; margin-bottom: 0 !important; padding: 0;  ">We have received a reset password request for your email, Click on the link below and enter your email address and code provided below to reset password.</p>
                  <p class="mb0" style="text-align: left; font-size: 15px; height: 15px;   line-height: 1; margin: 0; margin-bottom: 0 !important; ">&nbsp;</p> 
                  <p class="mb0" style="text-align: left; font-weight: normal; color: #164D74;     line-height: 1.5; margin: 0; margin-bottom: 0 !important; padding: 0;  "><a href="http://parenting.msaadjaved.com/reset-password">http://parenting.msaadjaved.com/reset-password</a></p>
                  <p class="mb0" style="text-align: left; font-size: 15px; height: 15px;   line-height: 1; margin: 0; margin-bottom: 0 !important; ">&nbsp;</p> 
                  <p class="mb0" style="text-align: left; font-weight: normal; color: #164D74;     line-height: 1.5; margin: 0; margin-bottom: 0 !important; padding: 0;  ">Email: <b>{{$user->email}}</b></p>
                  <p class="mb0" style="text-align: left; font-weight: normal; color: #164D74;     line-height: 1.5; margin: 0; margin-bottom: 0 !important; padding: 0;  ">Token: <b>{{$token}}</b></p>
                  <p class="mb0" style="text-align: left; font-size: 15px; height: 15px;   line-height: 1; margin: 0; margin-bottom: 0 !important; ">&nbsp;</p> 
                  <p class="mb0" style="text-align: left; font-weight: normal; color: #164D74;     line-height: 1.5; margin: 0; margin-bottom: 0 !important; padding: 0;  ">If you did not request a password reset, you can safely ignore this email. This token will automatically expire in 15 minutes.</p>
                 </th> 
                </tr> 
               </tbody> 
              </table> 
             </th> 
            </tr> 
           </tbody> 
          </table> 
          <table class="row content icon-list" style=" background-color: #fefefe; border-spacing: 0;   padding: 0;width: 100%; "> 
           <tbody> 
            <tr> 
             <td height="15px" style=" line-height: 15px;  mso-line-height-rule: exactly; padding: 0;">&nbsp;
             </td> 
            </tr> 
           </tbody> 
          </table> 
          <table class="row endcap" style=" background-color: #fefefe; border-radius: 0 0 6px 6px; border-spacing: 0; border-top: 1px solid #DBD9E5; padding: 0;width: 100%; "> 
           <tbody> 
            <tr> 
             <th class="small-12 large-12 columns first last" style=" padding: 0; padding-bottom: 25px; padding-top: 25px; padding-left: 35px; padding-right: 35px;  width: 545px; "> 
              <table style=" border-spacing: 0;  padding: 0;   width: 100%; "> 
               <tbody> 
                <tr> 
                 <th  > 
                  <p align="center" class="float-center" style="color:#8a7ecb;font-size:12px;font-weight:normal;line-height:1.5;margin:0!important;margin-bottom:30px;padding:0;text-align:left">Find Surrogate</p>
                  
                  <p align="center" class="float-center" style="color:#8a7ecb;font-size:12px;font-weight:normal;line-height:1.5;margin:0!important;margin-bottom:30px;padding:0;text-align:left">www.findsurrogate.com</p> 
                 </th> 
                </tr> 
               </tbody> 
              </table> 
             </th> 
            </tr> 
           </tbody> 
          </table> 
         </td> 
        </tr> 
       </tbody> 
      </table> 
      <table align="center" class="container float-center" style="border-spacing: 0;   width: 580px; "> 
       <tbody> 
        <tr> 
         <th class="expander" style="line-height: 1.5; padding: 0 !important; visibility: hidden; ">&nbsp;</th> 
        </tr> 
       </tbody> 
      </table>  
     </center>
    </td> 
   </tr> 
  </tbody> 
 </table> 
</body>