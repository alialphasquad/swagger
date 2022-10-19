-- CreateTable
CREATE TABLE "project_details_quickbase" (
    "record_id_quickbase" INTEGER NOT NULL,
    "project_name" TEXT,
    "project_manager" TEXT,
    "project_status" TEXT,
    "mcn_number" TEXT,
    "fua_number" TEXT,
    "customer_name" TEXT,
    "install_address" TEXT,
    "shipping_address" TEXT,
    "quote_number_netsuite" TEXT,
    "quote_number_aloha" TEXT,
    "quote_number_cpq" TEXT,
    "credit_card_processor" TEXT,
    "aloha_key_number" TEXT,
    "sales_order_memo" TEXT,
    "sales_person" TEXT,
    "sales_rep_email" TEXT,
    "completion_sign_off_date" DATE,
    "date_modified_qbrecord" DATE,
    "webhook_trigger_date" DATE,
    "webhook_trigger_owner" TEXT,
    "contact_id" INTEGER,
    "contact_firstname" TEXT,
    "contact_lastname" TEXT,
    "contact_fullname" TEXT,
    "contact_role" TEXT,
    "contact_phone" TEXT,
    "contact_email" TEXT,
    "current_boc_boh_location" TEXT,
    "current_boc_monitor_location" TEXT,
    "current_boc_existing_kvm" TEXT,
    "current_boc_exisiting_cc_modem" TEXT,
    "current_boc_existing_security_system" TEXT,
    "current_boc_security_system_integrated" TEXT,
    "current_boc_printer_interface" TEXT,
    "current_boc_ip_address" TEXT,
    "third_pty_web_ordering" TEXT[],
    "third_pty_delivery_to_go" TEXT[],
    "third_pty_customer_loyalty" TEXT[],
    "third_pty_gift_cards" TEXT[],
    "third_pty_reservations" TEXT[],
    "third_pty_inventory" TEXT[],
    "third_pty_scheduling" TEXT[],
    "third_pty_payments" TEXT[],
    "third_pty_beverage_services" TEXT[],
    "menu_upload" BYTEA,
    "floor_plan_upload" BYTEA,
    "credit_card_processor_upload" BYTEA,
    "project_type" TEXT,
    "site_name_qualtrics" TEXT,
    "available_in_portal" TEXT,
    "last_modified_by" TEXT,
    "qb_sync" BOOLEAN,
    "change_timestamp" INTEGER,
    "salesperson_phone" TEXT,
    "shipping_address_street" TEXT,
    "shipping_address_city" TEXT,
    "shipping_address_state" TEXT,
    "shipping_address_zipcode" TEXT,
    "install_address_street" TEXT,
    "install_address_city" TEXT,
    "install_address_state" TEXT,
    "install_address_zipcode" TEXT,
    "menu_upload_filename" TEXT,
    "floor_plan_upload_filename" TEXT,
    "credit_card_upload_filename" TEXT,
    "sales_order" TEXT,
    "main_contact_firstname" TEXT,
    "main_contact_lastname" TEXT,
    "project_percentage_complete" REAL,
    "project_status_client_portal" TEXT,
    "project_signoff_approved" BOOLEAN,
    "approve_install_date" BOOLEAN,
    "physical_site_phone" TEXT,
    "physical_site_email" TEXT,
    "menu_upload_docid" INTEGER,
    "floor_plan_upload_docid" INTEGER,
    "credit_card_upload_docid" INTEGER,
    "requested_install_date" INTEGER,
    "date_created_qbrecord" INTEGER,
    "questionnaire_submitted_date" INTEGER,
    "project_submitted_date" INTEGER,
    "project_signoff_date" INTEGER,
    "qualtrics_url" TEXT,
    "site_readiness_acknowledgement" JSON,

    CONSTRAINT "project_details_quickbase_pkey" PRIMARY KEY ("record_id_quickbase")
);

-- CreateTable
CREATE TABLE "task_details" (
    "task_id" INTEGER NOT NULL,
    "record_id_quickbase" INTEGER,
    "mcn_num" INTEGER,
    "task_name" TEXT,
    "custom_form" TEXT,
    "actual_start_date" DATE,
    "assigned_to" TEXT,
    "status" TEXT,
    "percent_complete" REAL,
    "at_risk" BOOLEAN,
    "actual_project_work" REAL,
    "hours_remaining" REAL,
    "customer_milestone" BOOLEAN,
    "baseline_start_date" DATE,
    "baseline_end_date" DATE,
    "actual_end_date" DATE,
    "quickbase_position" REAL,
    "ad_hoc" BOOLEAN,
    "action_required" BOOLEAN,
    "matching_quickbase_task" BOOLEAN,
    "display_name" TEXT,
    "change_timestamp" INTEGER,
    "date_modified" DATE,
    "date_created" DATE,
    "start_date" INTEGER,
    "end_date" INTEGER,

    CONSTRAINT "task_details_pkey" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "userName" TEXT,
    "userStatus" TEXT,
    "jobTitle" TEXT,
    "mcn_num" JSONB,
    "createdAt" TEXT,
    "updatedAt" TEXT,
    "lastLogin" TEXT,
    "authorization" BOOLEAN,
    "Role" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_config_table" (
    "task_name" TEXT,
    "quickbase_position" TEXT,
    "add_module_no_hw" BOOLEAN,
    "add_module_hw" BOOLEAN,
    "aloha_essentials_refresh" BOOLEAN,
    "connected_payments_addon" BOOLEAN,
    "new_aloha_essentials_install" BOOLEAN,
    "new_install" BOOLEAN,
    "software_only_essentials" BOOLEAN,
    "software_only_essentials_addon" BOOLEAN,
    "stage_and_ship" BOOLEAN,
    "system_refresh" BOOLEAN,
    "customer_milestone" BOOLEAN,
    "matching_quickbase_task" BOOLEAN,
    "pizza_grouping" TEXT,
    "ad_hoc" BOOLEAN,
    "action_required" BOOLEAN,
    "id" SERIAL NOT NULL,
    "display_name" TEXT,

    CONSTRAINT "task_config_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderDetails" (
    "orderNumber" INTEGER NOT NULL,
    "order_complete" BOOLEAN,
    "txtField" TEXT,
    "numberField" INTEGER,
    "percentageField" REAL,
    "currencyField" MONEY,
    "documentField" BYTEA,
    "confirm_site_information" TEXT,
    "bo_comp_location" TEXT,
    "bo_comp_monitor_config" TEXT,
    "bo_comp_kbm_yn" TEXT,
    "bo_comp_externalmodem_yn" TEXT,
    "bo_comp_securitycam_yn" TEXT,
    "bo_comp_securitycam_aloha_yn" TEXT,
    "bo_printer_usbnetwork_config" TEXT,
    "bo_printer_reinstall_yn" TEXT,
    "bo_printer_config" TEXT,
    "bo_printer_ipaddress" INET,
    "bo_printer_manufacturer" TEXT,
    "bo_printer_model" TEXT,
    "bo_historicaldata_retainlength" TEXT,
    "bo_thirdparty_partners" TEXT[],
    "bo_thirdparty_partners_unlisted" TEXT,
    "cs_creditcard_acceptcard_yn" TEXT,
    "cs_creditcard_acceptchip_yn" TEXT,
    "cs_kitchen_print_yn" TEXT,
    "cs_kitchen_monitor_yn" TEXT,
    "cs_kitchen_orderingsystem" TEXT,
    "cs_takeout_guestoption_yn" TEXT,
    "cs_takeout_aloha_yn" TEXT,
    "cs_takeout_alohaconfirm_yn" TEXT,
    "cs_guestseat_software_yn" TEXT,
    "cs_guestseat_software_provider" TEXT,
    "cs_guestseat_pager_yn" TEXT,
    "cs_hotel_locatedin_yn" TEXT,
    "cs_hotel_pmsoftware" TEXT,
    "cs_hotel_commtype" TEXT,
    "cs_giftcard_accept_yn" TEXT,
    "cs_giftcard_provider" TEXT,
    "cs_hostedsw_apps" TEXT[],
    "email_address" TEXT,

    CONSTRAINT "orderDetails_pkey" PRIMARY KEY ("orderNumber")
);

-- CreateTable
CREATE TABLE "quickbase_contacts" (
    "contact_id" INTEGER NOT NULL,
    "record_id_quickbase" INTEGER,
    "project_name" TEXT,
    "contact_firstname" TEXT,
    "contact_lastname" TEXT,
    "contact_fullname" TEXT,
    "contact_role" TEXT,
    "contact_email" TEXT,
    "contact_phone" TEXT,

    CONSTRAINT "quickbase_contacts_pkey" PRIMARY KEY ("contact_id")
);

-- CreateTable
CREATE TABLE "project_documents" (
    "record_id_quickbase" INTEGER,
    "name" TEXT,
    "type" TEXT,
    "file_path" TEXT,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),
    "id" SERIAL NOT NULL,
    "qb_doc_id" INTEGER,

    CONSTRAINT "project_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "access_log" (
    "log_id" INTEGER NOT NULL,
    "user_uuid" UUID,
    "email_address" TEXT,
    "event_timestamp" INTEGER,
    "event_type" TEXT,
    "success" BOOLEAN,
    "mcn_num" TEXT,

    CONSTRAINT "access_log_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "contact_change_log" (
    "contact_id" SERIAL NOT NULL,
    "changed_column_name" TEXT,
    "old_value" TEXT,
    "new_value" TEXT,
    "change_timestamp" INTEGER,
    "source" TEXT,
    "log_id" UUID,
    "source_user_id" TEXT,

    CONSTRAINT "contact_change_log_pkey" PRIMARY KEY ("contact_id")
);

-- CreateTable
CREATE TABLE "orderSummary" (
    "orderNumber" INTEGER NOT NULL,
    "user_uuid" UUID,
    "organization_id" INTEGER,
    "email_address" TEXT,

    CONSTRAINT "orderSummary_pkey" PRIMARY KEY ("orderNumber")
);

-- CreateTable
CREATE TABLE "pageConfiguration" (
    "pageID" INTEGER NOT NULL,
    "sectionID" INTEGER,
    "sortOrderNumber" INTEGER,
    "pageURL" TEXT,

    CONSTRAINT "pageConfiguration_pkey" PRIMARY KEY ("pageID")
);

-- CreateTable
CREATE TABLE "project_change_log" (
    "record_id_quickbase" INTEGER,
    "changed_column_name" TEXT,
    "old_value" TEXT,
    "new_value" TEXT,
    "change_timestamp" INTEGER,
    "source" TEXT,
    "log_id" UUID NOT NULL,
    "source_user_id" TEXT,

    CONSTRAINT "project_change_log_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "project_questions_config_table" (
    "question_name" TEXT NOT NULL,
    "section" TEXT,
    "question_type" TEXT,
    "question_format" TEXT,
    "question_options" TEXT[],
    "workflow" TEXT,
    "question_text" TEXT,
    "dependent_questions" TEXT[],
    "question_position" INTEGER,
    "section_id" INTEGER,

    CONSTRAINT "project_questions_config_table_pkey" PRIMARY KEY ("question_name")
);

-- CreateTable
CREATE TABLE "section_config_table" (
    "section_id" INTEGER NOT NULL,
    "section_name" TEXT,
    "section_order" INTEGER,

    CONSTRAINT "section_config_table_pkey" PRIMARY KEY ("section_id")
);

-- CreateTable
CREATE TABLE "sectionConfiguration" (
    "sectionID" INTEGER NOT NULL,
    "formType" TEXT,
    "sortOrderNumber" INTEGER,
    "sectionName" TEXT,

    CONSTRAINT "sectionConfiguration_pkey" PRIMARY KEY ("sectionID")
);

-- CreateTable
CREATE TABLE "task_change_log" (
    "task_id" INTEGER,
    "task_name" TEXT,
    "record_id_quickbase" INTEGER,
    "changed_column_name" TEXT,
    "old_value" TEXT,
    "new_value" TEXT,
    "change_timestamp" INTEGER,
    "source" TEXT,
    "source_user_id" TEXT,
    "log_id" UUID NOT NULL,

    CONSTRAINT "task_change_log_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "user_details" (
    "account_number" TEXT,
    "user_firstname" TEXT,
    "user_lastname" TEXT,
    "user_email" TEXT
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "mcn_num" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "tag" TEXT,
    "viewed" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wb_workflow" (
    "id" SERIAL NOT NULL,
    "workflow_name" TEXT,
    "workflow_description" TEXT,
    "integration_type" TEXT,
    "workflow_type" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wb_workflow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wb_task" (
    "id" SERIAL NOT NULL,
    "qb_task_id" INTEGER,
    "workflow_id" INTEGER,
    "stage_id" INTEGER,
    "customer_facing_name" TEXT,
    "qb_name" TEXT,
    "action_name" TEXT,
    "task_description" TEXT,
    "parent_task_id" INTEGER,
    "date_of_completion" TIMESTAMP(3),
    "customer_milestone" BOOLEAN,
    "action_required" BOOLEAN,
    "task_type" TEXT,
    "task_status" TEXT,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "wb_task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wb_stage" (
    "id" SERIAL NOT NULL,
    "stage_template_id" INTEGER,
    "workflow_id" INTEGER,
    "task_id" INTEGER,
    "stage_name" TEXT,
    "stage_type" TEXT,
    "json_data" JSONB,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "wb_stage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wb_stage_template" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "type" TEXT,
    "json_data" JSONB,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "wb_stage_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wb_parent_task" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "workflow_id" INTEGER,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "wb_parent_task_pkey" PRIMARY KEY ("id")
);
