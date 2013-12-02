# Create your views here.
#encoding=utf-8
from django.shortcuts import render_to_response
from django.db.models import Q
from TCM.models import Doctor
from TCM.models import Medicalcase
from TCM.models import Medicalcase
from TCM.models import ResultMedAndPre
from TCM.models import ResultWithoutMedicine
from TCM.models import ResultSymptomAndDisease
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.template import RequestContext 
import datetime
import MySQLdb
import json
import string
from django.core import serializers

 
def front(request):
            
    return render_to_response('front.html')

def classifybrows(request):
    
    return render_to_response('classifybrows.html')

def doctorpage(request):
    return render_to_response('doctorpage.html')
    
def seniorsearch(request):
    return render_to_response('seniorsearch.html')

def casedetail(request):
    return render_to_response('casedetail.html')
    
def dislist(request):
     response=HttpResponse()
     disname=request.POST.get('disname',None)
     pageNo=request.POST.get('pageno',None)
     pageSize=request.POST.get('pagesize',None)
     pageNo=string.atoi(pageNo)
     pageSize=string.atoi(pageSize)
     
     result = Medicalcase.objects.filter(Q(casename__icontains=disname))
     retval=serializers.serialize("json",result)
     retval=json.loads(retval)
     print(disname)
     print(retval)
     i=0
     list=[]
     data={}
     for eachCase in retval:
         i+=1
     for j in range(pageSize):
         if (pageNo-1)*pageSize+j>=i:
             break
         list.append({"field1":str(retval[(pageNo-1)*pageSize+j]["fields"]["drid"]),"field2":retval[(pageNo-1)*pageSize+j]["fields"]["casename"]})
     data['count']=i
     data['list']=list
     data=json.dumps(data,ensure_ascii=False)
     response.write(data)
     return response
 
def disclist(request):
    response=HttpResponse()
    discword=request.POST.get('discword',None)
    pageNo=request.POST.get('pageno',None)
    pageSize=request.POST.get('pagesize',None)
    pageNo=string.atoi(pageNo)
    pageSize=string.atoi(pageSize)
     
    result = Medicalcase.objects.filter(Q(discrimination__icontains=discword))
    retval=serializers.serialize("json",result)
    retval=json.loads(retval)
    
    i=0
    list=[]
    data={}
    for eachCase in retval:
        i+=1
    for j in range(pageSize):
        if (pageNo-1)*pageSize+j>=i:
            break
        list.append({"field1":str(retval[(pageNo-1)*pageSize+j]["fields"]["drid"]),"field2":retval[(pageNo-1)*pageSize+j]["fields"]["casename"]})
    data['count']=i
    data['list']=list
    data=json.dumps(data,ensure_ascii=False)
    response.write(data)
    return response
    
def therlist(request):
    response=HttpResponse()
    ther=request.POST.get('ther',None)
    pageNo=request.POST.get('pageno',None)
    pageSize=request.POST.get('pagesize',None)
    pageNo=string.atoi(pageNo)
    pageSize=string.atoi(pageSize)
     
    result = Medicalcase.objects.filter(Q(therapy__icontains=ther))
    retval=serializers.serialize("json",result)
    retval=json.loads(retval)
    
    i=0
    list=[]
    data={}
    for eachCase in retval:
        i+=1
    for j in range(pageSize):
        if (pageNo-1)*pageSize+j>=i:
            break
        list.append({"field1":str(retval[(pageNo-1)*pageSize+j]["fields"]["drid"]),"field2":retval[(pageNo-1)*pageSize+j]["fields"]["casename"]})
    data['count']=i
    data['list']=list
    data=json.dumps(data,ensure_ascii=False)
    response.write(data)
    return response
    
    
def doctorresultlist(request):
        response=HttpResponse()
        drname=request.POST.get('drname',None)
        pageNo=request.POST.get('pageno',None)
        pageSize=request.POST.get('pagesize',None)
        pageNo=string.atoi(pageNo)
        pageSize=string.atoi(pageSize)
        print(drname)

        result=Doctor.objects.filter(drname__exact=drname)
        drid=result[0].drid
        result=Medicalcase.objects.filter(drid__exact=drid)
        caseList=serializers.serialize("json",result)
        caseList=json.loads(caseList)
        i=0
        list=[]
        data={}
        for eachCase in caseList:
            i+=1
        for j in range(pageSize):
            if (pageNo-1)*pageSize+j>=i:
                break
            list.append({"field1":"","field2":caseList[(pageNo-1)*pageSize+j]["fields"]["casename"]})
        data['count']=i
        data['list']=list
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
        result=Doctor.objects.filter(Q(drname__icontains=keyword))
        retval=serializers.serialize("json",result)
        retval=json.loads(retval)
        i=0
        list=[]
        data={}
        for eachDoctor in retval:
            i+=1
        for j in range(pageSize):
            if (pageNo-1)*pageSize+j>=i:
                break
            list.append({"field1":retval[(pageNo-1)*pageSize+j]["fields"]["drname"],"field2":retval[(pageNo-1)*pageSize+j]["fields"]["drintroduction"],"field3":retval[(pageNo-1)*pageSize+j]["fields"]["drimage"]})
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
            if (pageNo-1)*pageSize+j>=i:
                break
            list.append({"field1":str(retval[(pageNo-1)*pageSize+j]["fields"]["drid"]),"field2":retval[(pageNo-1)*pageSize+j]["fields"]["casename"]})   
        data['count']=i
        data['list']=list
        data=json.dumps(data,ensure_ascii=False)
        response.write(data)
        return response
    
def casedetailinfo(request):
    response=HttpResponse()
    casename=request.POST.get('casename',None)
    print(casename)
    if casename :
        result=Medicalcase.objects.filter(Q(casename__exact=casename))
        caseList=serializers.serialize("json",result)
        caseList=json.loads(caseList)
        list={}
        data={}
        list['field1']=caseList[0]["fields"]["diagnosis"]
        list['field2']=caseList[0]["fields"]["discrimination"]
        list['field3']=caseList[0]["fields"]["therapy"]
        data['list']=list
        data=json.dumps(data,ensure_ascii=False)
        print(data)
        response.write(data)
    return response

def graphresultlist(request):
     response=HttpResponse()
     keyword = request.POST.get('keyword',None)
     layer=2
     data={'nodes':[],'links':[]}
     data['nodes'].append({'name':keyword,'group':0})
     for lay in range(layer):
         for i in range(len(data['nodes'])):
             if data['nodes'][i]['group']!=lay:
                 continue
             retval=graphSearchResult(data['nodes'][i]['name'])
             for j in range(min(10,len(retval))):
                 if retval[j]['fields']['text1'].find(data['nodes'][i]['name'])!=-1:
                     text='text2'
                 else:
                     text='text1'
                 node={}
                 node['name']=retval[j]['fields'][text]
                 node['group']=lay+1
                 data['nodes'].append(node)
                 link={}
                 link['source']=i
                 link['target']=len(data['nodes'])-1
                 link['value']=1
                 data['links'].append(link)
                 
     data=json.dumps(data,ensure_ascii=False)
     f=open('D:/MedicalCase/MedicalCase/src/MedicalCase/resources/D3JS/data.json','w')
     f.truncate()
     f.write(data)
     f.close()
     return response

def graphSearchResult(keyword):
     
     result1=ResultMedAndPre.objects.filter(Q(text1__icontains=keyword)|Q(text2__icontains=keyword))
     result2=ResultSymptomAndDisease.objects.filter(Q(text1__icontains=keyword)|Q(text2__icontains=keyword))
     result3=ResultWithoutMedicine.objects.filter(Q(text1__icontains=keyword)|Q(text2__icontains=keyword))
     retval1=serializers.serialize("json",result1)
     retval1=json.loads(retval1)
     retval2=serializers.serialize("json",result2)
     retval2=json.loads(retval2)
     retval3=serializers.serialize("json",result3)
     retval3=json.loads(retval3)
     retval=retval1+retval2+retval3
     
     return retval
 
def graph(request):
    return render_to_response('graph.html')

def graphsearch(request):
    return render_to_response('graphsearch.html')    
       
def index(request):
    return render_to_response('index.html')