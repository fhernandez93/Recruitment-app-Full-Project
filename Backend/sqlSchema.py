import pyodbc
from variables import *


# Connect to the database. This will create a new file named 'mydatabase.db' if it doesn't exist.
if os.environ.get("DEV"):
    Driver = rf"DRIVER={{SQL Server}};Server=localhost\SQLEXPRESS;Database=master;Trusted_Connection=True;"
else:
    Driver = rf"Driver={{ODBC Driver 18 for SQL Server}};Server=tcp:recruitment-app.database.windows.net,1433;Database=opt-recruitment-db;Uid={SQLUSER};Pwd={SQLPASS};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
    
conn = pyodbc.connect(Driver)
cursor = conn.cursor()

#Create tables 
cursor.execute('''
    if not exists (select * from sysobjects where name='REC - Interviews' and xtype='U')
    create table [REC - Interviews] (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        [Selected Candicate ID] INT,
        [Job ID] INT NOT NULL,
        [Client ID] INT NOT NULL,
        [Global Candicate ID] INT NOT NULL,
        [Date of Interview] DATE,
        [Custom Job Position] varchar(max),
        [Custom Candidate Name] varchar(max),
        [Notes] varchar(max),
        [Custom Role] varchar(max),
        [Status] varchar(max),
        [Tier] varchar(max),
    )
''')


cursor.execute('''
    if not exists (select * from sysobjects where name='REC - Jobs' and xtype='U')
    create table [REC - Jobs] (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        [Client ID] INT,
        [BI Client ID] INT,
        [Number of Positions Filled] INT,
        [Role Name] varchar(max),
        [Date Posted] DATE,
        [Job Status] varchar(max),
        [Role Description] varchar(max),
        [Salary Range High] FLOAT,
        [Salary Range Low] FLOAT,
        [Days - Hours] FLOAT,
        [Time Zone] varchar(max),
        [Days (From)] varchar(max),
        [Days (To)] varchar(max),
        [Phone Number] varchar(max),
        [Start Time] varchar(max),
        [End Time] varchar(max),
        [Notes] varchar(max),
        [Recruiting Lead] varchar(max),
    )
''')


cursor.execute('''
    if not exists (select * from sysobjects where name='REC - Selected Candidates' and xtype='U')
    create table [REC - Selected Candidates] (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        [Compliance Asset ID] INT NOT NULL,
        [Job ID] INT NOT NULL,
        [Interview ID] INT NOT NULL,
        [Global Candidate ID] INT NOT NULL,
        [Current Status] varchar(max),
        [Salary Offer] FLOAT,
        [Candidate Type] varchar(max),
        [Start Date] DATE,
       
    )
''')


cursor.execute('''
    if not exists (select * from sysobjects where name='REC - Global Candidates' and xtype='U')
    create table [REC - Global Candidates] (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        [Candidate Name] varchar(max),
        [Date of Birth] DATE,
        [Employment Status] varchar(max),
        [English Skills] varchar(max),
        [Job Skills] varchar(max),
        [Longevity Skills] varchar(max),
        [Phone Number] varchar(max),
        [Email] varchar(max),
        [Administrative Experience] varchar(max),
        [Call Center Experience] varchar(max),
        [Claims Processing Experience] varchar(max),
        [Customer Service Experience] varchar(max),
        [Financial Experience] varchar(max),
        [Insurance Experience] varchar(max),
        [Teaching Experience] varchar(max),
        [Medical Experience] varchar(max),
        [Comments] varchar(max),
    )
''')


cursor.execute('''
    if not exists (select * from sysobjects where name='REC - Global Candidates' and xtype='U')
    create table [REC - Global Candidates] (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        [Candidate Name] varchar(max),
        [Date of Birth] DATE,
        [Employment Status] varchar(max),
        [English Skills] varchar(max),
        [Job Skills] varchar(max),
        [Longevity Skills] varchar(max),
        [Phone Number] varchar(max),
        [Email] varchar(max),
        [Administrative Experience] varchar(max),
        [Call Center Experience] varchar(max),
        [Claims Processing Experience] varchar(max),
        [Customer Service Experience] varchar(max),
        [Financial Experience] varchar(max),
        [Insurance Experience] varchar(max),
        [Teaching Experience] varchar(max),
        [Medical Experience] varchar(max),
        [Comments] varchar(max),
    )
''')


cursor.execute('''
    if not exists (select * from sysobjects where name='REC - Candidate Attachment' and xtype='U')
    create table [REC - Candidate Attachment] (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        [Global Candicate ID] INT NOT NULL,
        [Attachment] VARBINARY(MAX),
        [Type ID] INT,
        [Attachmment URL] varchar(max),
    )
''')

cursor.execute('''
    if not exists (select * from sysobjects where name='REC - Frameworks' and xtype='U')
    create table [REC - Frameworks] (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        [Framework Name] varchar(max),
        [Language] varchar(max),
        [Role Type] varchar(max)
    )
''')

cursor.execute('''
    if not exists (select * from sysobjects where name='REC - Certifications & Courses' and xtype='U')
    create table [REC - Certifications & Courses] (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        [Global Candidate ID] INT,
        [Certification Name] varchar(max),
        [Organization] varchar(max),
        [Expedition Date] DATE, 
        [Link To Certificate] varchar(max),
    )
''')



conn.commit()
conn.close()