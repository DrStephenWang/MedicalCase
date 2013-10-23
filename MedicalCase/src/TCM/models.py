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
    class Meta:
        db_table = 'doctor'
    def __unicode__(self):
        return u'%s %s' % (self.drname,self.drintroduction)

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
    class Meta:
        db_table = 'medicalcase'
    def __unicode__(self):
        return u'%s %s %s %s' % (self.casename,self.diagnosis,self.therapy,self.discrimination)    