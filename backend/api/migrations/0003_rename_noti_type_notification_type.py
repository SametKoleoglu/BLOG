# Generated by Django 4.2 on 2024-06-24 15:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_category_post_notification_comment_bookmark'),
    ]

    operations = [
        migrations.RenameField(
            model_name='notification',
            old_name='noti_type',
            new_name='type',
        ),
    ]
