# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#     * Rearrange models' order
#     * Make sure each model has one field with primary_key=True
# Feel free to rename the models, but don't rename db_table values or field names.
#
# Also note: You'll have to insert the output of 'django-admin.py sqlcustom [appname]'
# into your database.
#encoding=utf-8
from __future__ import unicode_literals

from django.db import models

class Doctor(models.Model):
    drid = models.BigIntegerField(primary_key=True, db_column='drID') # Field name made lowercase.
    drname = models.CharField(max_length=50L, db_column='drName') # Field name made lowercase.
    drintroduction = models.CharField(max_length=5000L, db_column='drIntroduction', blank=True) # Field name made lowercase.
    drimage = models.CharField(max_length=50L, db_column='drImage')
    class Meta:
        db_table = 'doctor'
    def __unicode__(self):
        return u'%s %s' % (self.drname,self.drintroduction)

class ResultMedAndPre(models.Model):
    id=models.IntegerField(primary_key=True,db_column='id')
    text1=models.CharField(max_length=50L,db_column='Text1')
    text2=models.CharField(max_length=30L,db_column='Text2')
    num1=models.CharField(max_length=10L,db_column='num1')
    num2=models.CharField(max_length=10L,db_column='num2')
    num3=models.CharField(max_length=10L,db_column='num3')
    num4=models.CharField(max_length=10L,db_column='num4')
    class Meta:
        db_table='resultmedandpre'
    def __unicode__(self):
        return u'%s %s' %(self.Pre,self.Med)

class ResultSymptomAndDisease(models.Model):
    id=models.IntegerField(primary_key=True,db_column='id')
    text1=models.CharField(max_length=50L,db_column='Text1')
    text2=models.CharField(max_length=30L,db_column='Text2')
    num1=models.CharField(max_length=10L,db_column='num1')
    num2=models.CharField(max_length=10L,db_column='num2')
    num3=models.CharField(max_length=10L,db_column='num3')
    num4=models.CharField(max_length=10L,db_column='num4')
    class Meta:
        db_table='resultsymptomanddisease'
    def __unicode__(self):
        return u'%s %s' %(self.Dis,self.Sym)

class ResultWithoutMedicine(models.Model):
    id=models.IntegerField(primary_key=True,db_column='id')
    text1=models.CharField(max_length=50L,db_column='Text1')
    text2=models.CharField(max_length=30L,db_column='Text2')
    num1=models.CharField(max_length=10L,db_column='num1')
    num2=models.CharField(max_length=10L,db_column='num2')
    num3=models.CharField(max_length=10L,db_column='num3')
    num4=models.CharField(max_length=10L,db_column='num4')
    class Meta:
        db_table='resultwithoutmedicine'
    def __unicode__(self):
        return u'%s %s' %(self.Text1,self.Text2)

class Intrgratedmedicalcase(models.Model):
    caseid = models.BigIntegerField(primary_key=True, db_column='caseID') # Field name made lowercase.
    drid = models.ForeignKey(Doctor, db_column='drID') # Field name made lowercase.
    casedescription = models.TextField(db_column='caseDescription') # Field name made lowercase.
    casename = models.CharField(max_length=500L, db_column='caseName', blank=True) # Field name made lowercase.
    class Meta:
        db_table = 'intrgratedmedicalcase'

class Medicalcase(models.Model):
    caseid = models.ForeignKey(Intrgratedmedicalcase, primary_key=True, db_column='caseID') # Field name made lowercase.
    drid = models.ForeignKey(Doctor, db_column='drID') # Field name made lowercase.
    casename = models.CharField(max_length=500L, db_column='caseName', blank=True) # Field name made lowercase.
    diagnosis = models.TextField(blank=True)
    therapy = models.TextField(blank=True)
    discrimination = models.TextField(blank=True)
    drname= models.CharField(max_length=10L,db_column='drName')
    class Meta:
        db_table = 'medicalcase_copy_copy'
    def __unicode__(self):
        return u'%s %s %s %s %s' % (self.casename,self.diagnosis,self.therapy,self.discrimination,self.drname)

class Aggregation(models.Model):
    id = models.AutoField(primary_key=True,db_column='id')
    keyword = models.CharField(max_length=50L, db_column='keyword', blank=True)
    type = models.CharField(max_length=20L, db_column='type', blank=True)
    count = models.IntegerField(db_column='count')
    class Meta:
        db_table = 'medicalcase_aggregation'
    def __unicode__(self):
        return u'%s %s' % (self.keyword,self.type) 