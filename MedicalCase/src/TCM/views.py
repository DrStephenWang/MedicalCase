# Create your views here.
#encoding=utf-8
from django.shortcuts import render_to_response
from django.db.models import Q
from TCM.models import Doctor
from TCM.models import Medicalcase
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.template import RequestContext 
import datetime
import MySQLdb
import json
import string
from django.core import serializers

 
def name(request):
            
    return render_to_response('test5.html')

def doctorpage(request):
        
        return render_to_response('doctorpage.html')
    
def doctorresultlist(request):
        response=HttpResponse()
        drname=request.POST.get('drname',None)
        pageNo=request.POST.get('pageno',None)
        pageSize=request.POST.get('pagesize',None)
        pageNo=string.atoi(pageNo)
        pageSize=string.atoi(pageSize)
        print(drname)

        if drname :
            caseList=Medicalcase.objects.all()
            i=0
            list=[]
            data={}
            for eachCase in caseList:
                if eachCase.drid.drname==drname:
                    i+=1
                    list.append({"field2":eachCase.casename,"field1":""})  
            data['count']=i
            data['list']=list[(pageNo-1)*pageSize:(pageNo-1)*pageSize+pageSize]
            data=json.dumps(data,ensure_ascii=False)
            print(data)
            response.write(data)
        return response

def frontsearch(request):
    return render_to_response('frontsearch.html')
        

def frontresultlist(request):
    response=HttpResponse()
#     response['Content-Type']="text/javascript" 
    keyword = request.POST.get('keyword',None)
    type=request.POST.get('type',None)
    pageNo=request.POST.get('pageno',None)
    pageSize=request.POST.get('pagesize',None)
    pageNo=string.atoi(pageNo)
    pageSize=string.atoi(pageSize)
    
    if keyword and type=='doctor':
        doctorList=Doctor.objects.all()
        i=0
        list=[]
        data={}
        for eachDoctor in doctorList:
            if eachDoctor.drname == keyword :
               i+=1
               list.append({"field1":eachDoctor.drname,"field2":eachDoctor.drintroduction})
        data['count']=i
        data['list']=list
        data=json.dumps(data,ensure_ascii=False)
        print(data)
        response.write(data)
        return response
                
  
    if keyword  and type=="other" :
        response=HttpResponse()
        result = Medicalcase.objects.filter(Q(casename__icontains=keyword)|Q(diagnosis__icontains=keyword)|Q(therapy__icontains=keyword)|Q(discrimination__icontains=keyword))
        retval = serializers.serialize("json", result)
        retval=json.loads(retval)
        i=0
        data={}
        list=[]
        for eachCase in retval:
           i+=1
        for j in range(pageSize):
            list.append({"field1":str(retval[(pageNo-1)*pageSize+j]["fields"]["drid"]),"field2":retval[(pageNo-1)*pageSize+j]["fields"]["casename"]})   
        data['count']=i
        data['list']=list
        data=json.dumps(data,ensure_ascii=False)
        response.write(data)
        return response
    
    
    
        
    #info= Doctor.objects.get(drname=doctorname)
    #print doctorname
    #return render_to_response('test.html', {'doctorname': info})
