# Create your views here.
#encoding=utf-8
from django.shortcuts import render_to_response
from TCM.models import Doctor
from django.http import HttpResponse
import datetime
import MySQLdb

def name(request):
   names = Doctor.objects.all()
   print names
   return render_to_response('test.html', {'names': names})
