import pyodbc
from variables import *


# Connect to the database. This will create a new file named 'mydatabase.db' if it doesn't exist.
if os.environ.get("DEV"):
    Driver = rf"DRIVER={{SQL Server}};Server=localhost\SQLEXPRESS;Database=master;Trusted_Connection=True;"
else:
    Driver = rf"Driver={{ODBC Driver 18 for SQL Server}};Server=tcp:recruitment-app.database.windows.net,1433;Database=opt-recruitment-db;Uid={SQLUSER};Pwd={SQLPASS};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
    
conn = pyodbc.connect(Driver)
cursor = conn.cursor()


# ------------------ Tables ------------------

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='GlobalCandidate' AND xtype='U')
    CREATE TABLE GlobalCandidate (
        CandidateID INT IDENTITY(1,1) PRIMARY KEY,
        CandidateFirstName NVARCHAR(255) NOT NULL,
        CandidateLastName NVARCHAR(255) NOT NULL,
        DateOfBirth DATE,
        GlobalStatusID INT,                    -- FK - GlobalStatus
        EnglishCertificationID INT,           -- FK - EnglishCertification
        EnglishRating INT,
        EducationLevelID INT,                      -- FK - EducationLevelID
        EducationNotes NVARCHAR(MAX),
        Skills NVARCHAR(MAX),
        WorkHistory NVARCHAR(MAX),
        CandidateNotes NVARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='EnglishCertification' AND xtype='U')
    CREATE TABLE EnglishCertification (
        CertificationID INT IDENTITY(1,1) PRIMARY KEY,
        Certification NVARCHAR(MAX),
        Comments NVARCHAR(MAX),
        Active INT,
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='GlobalStatus' AND xtype='U')
    CREATE TABLE GlobalStatus (
        StatusID INT IDENTITY(1,1) PRIMARY KEY,
        Status NVARCHAR(MAX),
        Comments NVARCHAR(MAX),
        Active INT,
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='EducationLevel' AND xtype='U')
    CREATE TABLE EducationLevel (
        EducationLevelID INT IDENTITY(1,1) PRIMARY KEY,
        EducationLevel NVARCHAR(MAX),
        Comments NVARCHAR(MAX),
        Active INT,
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Interviews' AND xtype='U')
    CREATE TABLE Interviews (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        SelectedCandidateID INT,
        JobID INT NOT NULL,
        ClientID INT NOT NULL,
        GlobalCandidateID INT NOT NULL,
        DateOfInterview DATE,
        CustomJobPosition VARCHAR(MAX),
        CustomCandidateName VARCHAR(MAX),
        Notes VARCHAR(MAX),
        CustomRole VARCHAR(MAX),
        Status VARCHAR(MAX),
        Tier VARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Jobs' AND xtype='U')
    CREATE TABLE Jobs (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        ClientID INT,
        BIClientID INT,
        NumberOfPositionsFilled INT,
        RoleName VARCHAR(MAX),
        DatePosted DATE,
        JobStatus VARCHAR(MAX),
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
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='SelectedCandidates' AND xtype='U')
    CREATE TABLE SelectedCandidates (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        ComplianceAssetID INT NOT NULL,
        JobID INT NOT NULL,
        InterviewID INT NOT NULL,
        GlobalCandidateID INT NOT NULL,
        CurrentStatus VARCHAR(MAX),
        SalaryOffer FLOAT,
        CandidateType VARCHAR(MAX),
        StartDate DATE,
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='GlobalCandidates' AND xtype='U')
    CREATE TABLE GlobalCandidates (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        CandidateName VARCHAR(MAX),
        DateOfBirth DATE,
        EmploymentStatus VARCHAR(MAX),
        EnglishSkills VARCHAR(MAX),
        JobSkills VARCHAR(MAX),
        LongevitySkills VARCHAR(MAX),
        PhoneNumber VARCHAR(MAX),
        Email VARCHAR(MAX),
        AdministrativeExperience VARCHAR(MAX),
        CallCenterExperience VARCHAR(MAX),
        ClaimsProcessingExperience VARCHAR(MAX),
        CustomerServiceExperience VARCHAR(MAX),
        FinancialExperience VARCHAR(MAX),
        InsuranceExperience VARCHAR(MAX),
        TeachingExperience VARCHAR(MAX),
        MedicalExperience VARCHAR(MAX),
        Comments VARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CandidateAttachment' AND xtype='U')
    CREATE TABLE CandidateAttachment (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        GlobalCandidateID INT NOT NULL,
        Attachment VARBINARY(MAX),
        TypeID INT,
        AttachmentURL VARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Frameworks' AND xtype='U')
    CREATE TABLE Frameworks (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        FrameworkName VARCHAR(MAX),
        Language VARCHAR(MAX),
        RoleType VARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

cursor.execute('''
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CertificationsAndCourses' AND xtype='U')
    CREATE TABLE CertificationsAndCourses (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        GlobalCandidateID INT,
        CertificationName VARCHAR(MAX),
        Organization VARCHAR(MAX),
        ExpeditionDate DATE, 
        LinkToCertificate VARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    )
''')

# Commit and close connection
conn.commit()
conn.close()
