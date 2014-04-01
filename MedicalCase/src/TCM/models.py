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
    type1=models.CharField(max_length=10L,db_column='type1')
    type2=models.CharField(max_length=10L,db_column='type2')
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
    type1=models.CharField(max_length=10L,db_column='type1')
    type2=models.CharField(max_length=10L,db_column='type2')
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
    type1=models.CharField(max_length=10L,db_column='type1')
    type2=models.CharField(max_length=10L,db_column='type2')
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
        db_table = 'medicalcase_copy'
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
        return u'%s %s %d' % (self.keyword,self.type,self.count) 

class Accesstime(models.Model):
    id = models.AutoField(primary_key=True,db_column='id')
    ip = models.CharField(max_length=20L, db_column='ip', blank=True)
    accesstime = models.CharField(max_length=50L,db_column='accesstime')
    class Meta:
        db_table = 'medicalcase_access_record'
    def __unicode__(self):
        return u'%s %s' % (self.ip,self.accesstime) 
    
class Word2topic(models.Model):
    wordid = models.IntegerField(primary_key=True,db_column='WordID')
    word = models.CharField(max_length=50L, db_column='Word')
    topic1 = models.IntegerField(db_column='Topic1')
    topic2 = models.IntegerField(db_column='Topic2')
    topic3 = models.IntegerField(db_column='Topic3')
    topic4 = models.IntegerField(db_column='Topic4')
    topic5 = models.IntegerField(db_column='Topic5')
    topic6 = models.IntegerField(db_column='Topic6')
    topic7 = models.IntegerField(db_column='Topic7')
    topic8 = models.IntegerField(db_column='Topic8')
    topic9 = models.IntegerField(db_column='Topic9')
    topic10 = models.IntegerField(db_column='Topic10')
    topic11 = models.IntegerField(db_column='Topic11')
    topic12 = models.IntegerField(db_column='Topic12')
    topic13 = models.IntegerField(db_column='Topic13')
    topic14 = models.IntegerField(db_column='Topic14')
    topic15 = models.IntegerField(db_column='Topic15')
    topic16 = models.IntegerField(db_column='Topic16')
    topic17 = models.IntegerField(db_column='Topic17')
    topic18 = models.IntegerField(db_column='Topic18')
    topic19 = models.IntegerField(db_column='Topic19')
    topic20 = models.IntegerField(db_column='Topic20')
    topic21 = models.IntegerField(db_column='Topic21')
    topic22 = models.IntegerField(db_column='Topic22')
    topic23 = models.IntegerField(db_column='Topic23')
    topic24 = models.IntegerField(db_column='Topic24')
    topic25 = models.IntegerField(db_column='Topic25')
    topic26 = models.IntegerField(db_column='Topic26')
    topic27 = models.IntegerField(db_column='Topic27')
    topic28 = models.IntegerField(db_column='Topic28')
    topic29 = models.IntegerField(db_column='Topic29')
    topic30 = models.IntegerField(db_column='Topic30')
    topic31 = models.IntegerField(db_column='Topic31')
    topic32 = models.IntegerField(db_column='Topic32')
    topic33 = models.IntegerField(db_column='Topic33')
    topic34 = models.IntegerField(db_column='Topic34')
    topic35 = models.IntegerField(db_column='Topic35')
    topic36 = models.IntegerField(db_column='Topic36')
    topic37 = models.IntegerField(db_column='Topic37')
    topic38 = models.IntegerField(db_column='Topic38')
    topic39 = models.IntegerField(db_column='Topic39')
    topic40 = models.IntegerField(db_column='Topic40')
    topic41 = models.IntegerField(db_column='Topic41')
    topic42 = models.IntegerField(db_column='Topic42')
    topic43 = models.IntegerField(db_column='Topic43')
    topic44 = models.IntegerField(db_column='Topic44')
    topic45 = models.IntegerField(db_column='Topic45')
    topic46 = models.IntegerField(db_column='Topic46')
    topic47 = models.IntegerField(db_column='Topic47')
    topic48 = models.IntegerField(db_column='Topic48')
    topic49 = models.IntegerField(db_column='Topic49')
    topic50 = models.IntegerField(db_column='Topic50')
    class Meta:
        db_table = 'word2topic'
    def __unicode__(self):
        return u'%d %s' % (self.wordid,self.word) 
    
class Case2topic(models.Model):
    caseid = models.IntegerField(primary_key=True,db_column='CaseId')
    caseno = models.CharField(max_length=50L, db_column='CaseNo')
    topic1 = models.IntegerField(db_column='Topic1')
    topic2 = models.IntegerField(db_column='Topic2')
    topic3 = models.IntegerField(db_column='Topic3')
    topic4 = models.IntegerField(db_column='Topic4')
    topic5 = models.IntegerField(db_column='Topic5')
    topic6 = models.IntegerField(db_column='Topic6')
    topic7 = models.IntegerField(db_column='Topic7')
    topic8 = models.IntegerField(db_column='Topic8')
    topic9 = models.IntegerField(db_column='Topic9')
    topic10 = models.IntegerField(db_column='Topic10')
    topic11 = models.IntegerField(db_column='Topic11')
    topic12 = models.IntegerField(db_column='Topic12')
    topic13 = models.IntegerField(db_column='Topic13')
    topic14 = models.IntegerField(db_column='Topic14')
    topic15 = models.IntegerField(db_column='Topic15')
    topic16 = models.IntegerField(db_column='Topic16')
    topic17 = models.IntegerField(db_column='Topic17')
    topic18 = models.IntegerField(db_column='Topic18')
    topic19 = models.IntegerField(db_column='Topic19')
    topic20 = models.IntegerField(db_column='Topic20')
    topic21 = models.IntegerField(db_column='Topic21')
    topic22 = models.IntegerField(db_column='Topic22')
    topic23 = models.IntegerField(db_column='Topic23')
    topic24 = models.IntegerField(db_column='Topic24')
    topic25 = models.IntegerField(db_column='Topic25')
    topic26 = models.IntegerField(db_column='Topic26')
    topic27 = models.IntegerField(db_column='Topic27')
    topic28 = models.IntegerField(db_column='Topic28')
    topic29 = models.IntegerField(db_column='Topic29')
    topic30 = models.IntegerField(db_column='Topic30')
    topic31 = models.IntegerField(db_column='Topic31')
    topic32 = models.IntegerField(db_column='Topic32')
    topic33 = models.IntegerField(db_column='Topic33')
    topic34 = models.IntegerField(db_column='Topic34')
    topic35 = models.IntegerField(db_column='Topic35')
    topic36 = models.IntegerField(db_column='Topic36')
    topic37 = models.IntegerField(db_column='Topic37')
    topic38 = models.IntegerField(db_column='Topic38')
    topic39 = models.IntegerField(db_column='Topic39')
    topic40 = models.IntegerField(db_column='Topic40')
    topic41 = models.IntegerField(db_column='Topic41')
    topic42 = models.IntegerField(db_column='Topic42')
    topic43 = models.IntegerField(db_column='Topic43')
    topic44 = models.IntegerField(db_column='Topic44')
    topic45 = models.IntegerField(db_column='Topic45')
    topic46 = models.IntegerField(db_column='Topic46')
    topic47 = models.IntegerField(db_column='Topic47')
    topic48 = models.IntegerField(db_column='Topic48')
    topic49 = models.IntegerField(db_column='Topic49')
    topic50 = models.IntegerField(db_column='Topic50')
    class Meta:
        db_table = 'case2topic'
    def __unicode__(self):
        return u'%d %s' % (self.caseid,self.caseno) 