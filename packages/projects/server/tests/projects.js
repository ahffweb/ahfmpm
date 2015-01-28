'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Project = mongoose.model('Project');

/**
 * Globals
 */
var user;
var project;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Project:', function() {
    beforeEach(function(done) {
      user = new User({
        name: {
          first: 'Taylor',
          last: 'McMonigle'
        },
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        project = new Project({
          activity: [{
            action: 'Updated project item progress',
            date: 'Tue Jan 27 2015 14:30:54 GMT-0800 (PST)',
            userId: '5446c7a0a0d8ebf089fb99d8'
          }],
          general: {
            name: {
              first: 'Taylor',
              last: 'McMonigle'
            },
            department: 'Web',
            email: 'taylor.mcmonigle@aidshealth.org',
            costCenter: '57746',
            additionalInfo: 'none',
            projectName: 'New Web Project',
            projectDescription: 'none',
            completionDate: 'Tue Jan 27 2015 14:30:54 GMT-0800 (PST)',
            departmentHeadApproving: 'Jason Farmer',
            projectAudience: 'Kids',
            projectMessage: 'Dont do drugs'
          },
          items: [{
            title: 'new website',
            progress: 50,
            status: 'in progress'
          }],
          progress: 50,
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return project.save(function(err) {
          should.not.exist(err);
          project.general.name.first.should.equal('Taylor');
          project.general.name.last.should.equal('McMonigle');
          project.user.should.not.have.length(0);
          project.created.should.not.have.length(0);
          done();
        });
      });

      it('should be able to show an error when try to save without first name', function(done) {
        project.general.name.first = '';

        return project.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without last name', function(done) {
        project.general.name.last = '';

        return project.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        project.user = {};

        return project.save(function(err) {
          should.exist(err);
          done();
        });
      });

    });

    afterEach(function(done) {
      project.remove();
      user.remove();
      done();
    });
  });
});
