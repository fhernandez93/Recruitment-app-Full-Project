import pyodbc
from variables import *


# Connect to the database.
if os.environ.get("DEV"):
    Driver = rf"DRIVER={{SQL Server}};Server=localhost\SQLEXPRESS;Database=master;Trusted_Connection=True;"
else:
    Driver = rf"Driver={{ODBC Driver 18 for SQL Server}};Server=tcp:recruitment-app.database.windows.net,1433;Database=opt-recruitment-db;Uid={SQLUSER};Pwd={SQLPASS};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
    
conn = pyodbc.connect(Driver)
cursor = conn.cursor()


# ------------------ Tables ------------------

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Candidates' AND xtype='U')
    CREATE TABLE Candidates (
        CandidateId INT IDENTITY(1,1) PRIMARY KEY,
        EducationLevelId INT,                   -- FK - EducationLevel
        EnglishCertificationId INT,             -- FK - EnglishCertifications
        FirstName NVARCHAR(255) NOT NULL,
        LastName NVARCHAR(255) NOT NULL,
        DateOfBirth DATE,
        EnglishRating INT,
        EducationNotes NVARCHAR(MAX),
        SkillsNotes NVARCHAR(MAX),
        WorkHistory NVARCHAR(MAX),
        Notes NVARCHAR(MAX),
        CreatedBy VARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Interviews' AND xtype='U')
    CREATE TABLE Interviews (
        InterviewId INT IDENTITY(1,1) PRIMARY KEY,
        CandidateId INT NOT NULL,               -- FK - Candidates
        JobId INT NOT NULL,                     -- FK - Jobs
        ClientId INT NOT NULL,                  -- FK - Clients
        DateOfInterview DATE,
        CustomJobPosition VARCHAR(MAX),
        CustomCandidateName VARCHAR(MAX),
        Notes VARCHAR(MAX),
        CustomRole VARCHAR(MAX),
        Status VARCHAR(MAX),
        Tier VARCHAR(MAX),
        CreatedBy VARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Jobs' AND xtype='U')
    CREATE TABLE Jobs (
        JobId INT IDENTITY(1,1) PRIMARY KEY,
        RoleName VARCHAR(MAX),
        ClientId INT,                           -- FK - Clients
        City VARCHAR(MAX),
        State VARCHAR(MAX),
        Country VARCHAR(MAX),
        DatePosted DATE,
        DateJobStart DATE,
        RecruitingLeadUserId INT,               -- FK - Users
        HiringManagerUserId INT,                -- FK - Users
        InterviewerUserId INT,                  -- FK - Users
        ApplicationStatusId INT,                -- FK - ApplicationStatuses
        RoleDescription VARCHAR(MAX),
        SalaryRangeHigh FLOAT,
        SalaryRangeLow FLOAT,
        DaysHours FLOAT,
        TimeZone VARCHAR(MAX),
        DaysFrom VARCHAR(MAX),
        DaysTo VARCHAR(MAX),
        PhoneNumber VARCHAR(MAX),
        StartTime VARCHAR(MAX),
        EndTime VARCHAR(MAX),
        Notes VARCHAR(MAX),
        RecruitingLead VARCHAR(MAX),
        CreatedBy VARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Applications' AND xtype='U')
    CREATE TABLE Applications (
        ApplicationId INT IDENTITY(1,1) PRIMARY KEY,
        JobId INT NOT NULL,                     -- FK - Jobs
        CandidateId INT NOT NULL,               -- FK - Candidates
        ApplicationStatusId INT NOT NULL,       -- FK - ApplicationStatuses
        CurrentStatus INT,
        SalaryOffer FLOAT,
        StartDate DATE,
        CreatedBy VARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ApplicationStatuses' AND xtype='U')
    CREATE TABLE ApplicationStatuses (
        ApplicationStatusId INT IDENTITY(1,1) PRIMARY KEY,
        JobId INT NOT NULL,                     -- FK - Jobs
        StatusName VARCHAR(MAX),
        StatusOrder INT,
        StatusDescription VARCHAR(MAX),
        CreatedBy VARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='JobStatuses' AND xtype='U')
    CREATE TABLE JobStatuses (
        JobStatusId INT IDENTITY(1,1) PRIMARY KEY,
        JobId INT NOT NULL,                     -- FK - Jobs
        StatusName VARCHAR(MAX),
        StatusOrder INT,
        StatusDescription VARCHAR(MAX),
        CreatedBy VARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

#################################
# CATALOGS
#################################

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='EnglishCertifications' AND xtype='U')
    CREATE TABLE EnglishCertifications (
        EnglishCertificationId INT IDENTITY(1,1) PRIMARY KEY,
        Certification NVARCHAR(MAX),
        Comments NVARCHAR(MAX),
        CreatedBy VARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='GlobalStatus' AND xtype='U')
    CREATE TABLE GlobalStatus (
        GlobalStatusId INT IDENTITY(1,1) PRIMARY KEY,
        Status NVARCHAR(MAX),
        Comments NVARCHAR(MAX),
        CreatedBy VARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='EducationLevel' AND xtype='U')
    CREATE TABLE EducationLevel (
        EducationLevelId INT IDENTITY(1,1) PRIMARY KEY,
        EducationLevelName NVARCHAR(MAX),
        Comments NVARCHAR(MAX),
        CreatedBy VARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CandidateAttachments' AND xtype='U')
    CREATE TABLE CandidateAttachments (
        CandidateAttachmentId INT IDENTITY(1,1) PRIMARY KEY,
        CandidateId INT NOT NULL,                   -- FK - Candidates
        Attachment VARBINARY(MAX),
        TypeId INT,
        AttachmentURL VARCHAR(MAX),
        CreatedBy VARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Frameworks' AND xtype='U')
    CREATE TABLE Frameworks (
        FrameworkId INT IDENTITY(1,1) PRIMARY KEY,
        FrameworkName VARCHAR(MAX),
        Language VARCHAR(MAX),
        RoleType VARCHAR(MAX),
        CreatedBy VARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Certifications' AND xtype='U')
    CREATE TABLE Certifications (
        CertificationId INT IDENTITY(1,1) PRIMARY KEY,
        CandidateId INT,                        -- FK - Candidates
        CertificationName VARCHAR(MAX),
        Organization VARCHAR(MAX),
        ExpeditionDate DATE, 
        LinkToCertificate VARCHAR(MAX),
        CreatedBy VARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

# Commit and close connection
conn.commit()
conn.close()
