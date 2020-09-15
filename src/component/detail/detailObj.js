    const obj = {
        //项目信息
        projectDetailObj:[
            { label: 'company_name', name: '企业名称', type:'text',noData: '未输入企业名称' },
            { label: 'company_address', name: '企业地址', type:'text',noData: '暂无数据' },
            { label: 'report_number', name: '报案号', type:'text',noData: '未输入报案号' },
            { label: 'insurance_number', name: '保单号', type:'text',noData: '未输入保单号' },
            { label: 'create_at', name: '创建时间', type:'data',noData: '未输入创建时间',temp:'yyyy-MM-dd hh:mm'},
            { label: 'submit_at', name: '完成时间', type:'data',noData: '未输入完成时间',temp:'yyyy-MM-dd'},
            { label: 'user_name', name: '查勘人员', type:'normal',noData: '查勘人员' },
        ],
        //资料信息
        dataDetailObj:[
            { imgTitle: 'social_credit_code_certificate_att', name: '统一社会信用代码', noData: '暂无数据',img:true},
            { imgTitle: 'id_card_atts', name: '法人身份证正反面复印件', noData: '暂无数据', img:true},
            { imgTitle: 'winning_bid_atts', name: '中标截图、中标通知书或承接工程通知书', noData: '暂无数据', img:true},
            { imgTitle: 'safety_policy_atts', name: '常州建施安责险投保单', noData: '暂无数据', img:true},
            { imgTitle: 'industry_safety_production_insure_terms_atts', name: '建筑施工行业安全生产责任保险条款', noData: '暂无数据',img:true},
            { imgTitle: 'safety_production_additional_employers_terms_att', name: '安全生产责任险附加补充雇主责任条款', noData: '暂无数据',img:true},
            { imgTitle: 'safety_production_additional_property_insure_terms_att', name: '安全生产责任险附加第三者财产责任保险条款', noData: '暂无数据',img:true},
            { imgTitle: 'additional_terms_atts', name: '附加条款', noData: '暂无数据',img:true},
        ],
        //开票信息
        InvoiceDetailObj:[
            { label: 'company_name', name: '单位名称', noData: '暂无数据' },
            { label: 'taxpayer_identification_number', name: '纳税人识别号', noData: '暂无数据' },
            { label: 'company_address', name: '地址', noData: '暂无数据' },
            { label: 'company_phone', name: '电话', noData: '暂无数据' },
            { label: 'bank_of_deposit', name: '开户行', noData: '暂无数据'},
            { label: 'bank_account', name: '账号', noData: '暂无数据' },
        ],
        //企业联系人
        contacts:[
            {label: 'com_contact_name', name: '姓名', noData: '暂无数据'},
            {label: 'com_contact_phone', name: '手机号码', noData: '暂无数据'},
        ],
    }
export default obj
