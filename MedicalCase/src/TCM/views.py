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

def name(request):
    doctorname = request.REQUEST.get('keyword',None)
    other = request.REQUEST.get('other',None)
   
    if doctorname is not None:
        doctorsList=Doctor.objects.all()
        
        for doctors in doctorsList:
            if doctors.drname == doctorname :
                return render_to_response('test4.html', {'name': doctors.drname,'intro':doctors.drintroduction})
                
   
    if other is not None:
        others = Medicalcase.objects.filter(Q(casename__icontains=other)|Q(diagnosis__icontains=other)|Q(therapy__icontains=other)|Q(discrimination__icontains=other))
        return render_to_response('test5.html', {'other': others})
    return render_to_response('test3.html')
            
    #return render_to_response('test.html')
    #info= Doctor.objects.get(drname=doctorname)
    #print doctorname
    #return render_to_response('test.html', {'doctorname': info})
