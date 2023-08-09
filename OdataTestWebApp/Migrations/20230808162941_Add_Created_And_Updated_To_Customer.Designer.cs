﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using OdataTestWebApp.Configurations;

#nullable disable

namespace OdataTestWebApp.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20230808162941_Add_Created_And_Updated_To_Customer")]
    partial class Add_Created_And_Updated_To_Customer
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("OdataTestWebApp.Models.Daos.CustomerDao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Created")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("Updated")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("OdataTestWebApp.Models.Daos.OrderDao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Amount")
                        .HasColumnType("numeric");

                    b.Property<int?>("CustomerDaoId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("CustomerDaoId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("OdataTestWebApp.Models.Daos.SettingDao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsProduction")
                        .HasColumnType("boolean");

                    b.Property<bool>("ShouldEnablePerformanceMode")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.ToTable("Settings");
                });

            modelBuilder.Entity("OdataTestWebApp.Models.Daos.OrderDao", b =>
                {
                    b.HasOne("OdataTestWebApp.Models.Daos.CustomerDao", null)
                        .WithMany("Orders")
                        .HasForeignKey("CustomerDaoId");
                });

            modelBuilder.Entity("OdataTestWebApp.Models.Daos.CustomerDao", b =>
                {
                    b.Navigation("Orders");
                });
#pragma warning restore 612, 618
        }
    }
}
