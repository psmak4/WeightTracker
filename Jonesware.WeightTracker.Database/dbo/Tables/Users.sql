﻿CREATE TABLE [dbo].[Users]
(
    [Id]                   NVARCHAR (128) NOT NULL,
    [Email]                NVARCHAR (MAX) NULL,
    [EmailConfirmed]       BIT            NOT NULL,
    [PasswordHash]         NVARCHAR (MAX) NULL,
    [SecurityStamp]        NVARCHAR (MAX) NULL,
    [PhoneNumber]          NVARCHAR (MAX) NULL,
    [PhoneNumberConfirmed] BIT            NOT NULL,
    [TwoFactorEnabled]     BIT            NOT NULL,
    [LockoutEndDateUtc]    DATETIME       NULL,
    [LockoutEnabled]       BIT            NOT NULL,
    [AccessFailedCount]    INT            NOT NULL,
    [UserName]             NVARCHAR (MAX) NULL,
    [FirstName]            NVARCHAR (100) NULL,
    [LastName]             NVARCHAR (100) NULL,
    [DateOfBirth]          DATETIME       NULL,
    [Height]    INT            NULL,
    [Gender]             CHAR (1) NULL,
    [DateCreated]          DATETIME       NULL,
    [Theme]            NVARCHAR (20) NULL,
    [Discriminator]        NVARCHAR (128) NOT NULL,
    CONSTRAINT [PK_dbo.Users] PRIMARY KEY CLUSTERED ([Id] ASC)
)
