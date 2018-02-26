<style lang="less">
    @import './own-space.less';
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                {{'Personal Information'|l}}
            </p>
            <div>
                <Form 
                    ref="userForm"
                    :model="userForm" 
                    :label-width="100" 
                    label-position="right"
                    :rules="inforValidate"
                >
                    <FormItem label="{{'Username'|l}}:" prop="name">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.name" ></Input>
                        </div>
                    </FormItem>
                    <FormItem label="Phone：" prop="cellphone" >
                        <div style="display:inline-block;width:204px;">
                            <Input v-model="userForm.cellphone" @on-keydown="hasChangePhone"></Input>
                        </div>
                        <div style="display:inline-block;position:relative;">
                            <Button @click="getIdentifyCode" :disabled="canGetIdentifyCode">{{ gettingIdentifyCodeBtnContent }}</Button>
                            <div class="own-space-input-identifycode-con" v-if="inputCodeVisible">
                                <div style="background-color:white;z-index:110;margin:10px;">
                                    <Input v-model="securityCode" placeholder="Please fill security code" ></Input>
                                    <div style="margin-top:10px;text-align:right">
                                        <Button type="ghost" @click="cancelInputCodeBox">{{'Cancel'|l}}</Button>
                                        <Button type="primary" @click="submitCode" :loading="checkIdentifyCodeLoading">{{'Login'|l}}</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FormItem>
                    <FormItem label="{{'Company'|l}}:">
                        <span>{{ userForm.company }}</span>
                    </FormItem>
                    <FormItem label="{{'Department'|l}}:">
                        <span>{{ userForm.department }}</span>
                    </FormItem>
                    <FormItem label="{{'Password'|l}}:">
                        <Button type="text" size="small" @click="showEditPassword">{{'Change Password'|l}}</Button>
                    </FormItem>
                    <div>
                        <Button type="text" style="width: 100px;" @click="cancelEditUserInfor">{{'Cancel'|l}}</Button>
                        <Button type="primary" style="width: 100px;" :loading="save_loading" @click="saveEdit">{{'Save'|l}}</Button>
                    </div>
                </Form>
            </div>
        </Card>
        <Modal v-model="editPasswordModal" :closable='false' :mask-closable=false :width="500">
            <h3 slot="header" style="color:#2D8CF0">{{'Change Password'|l}}</h3>
            <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right" :rules="passwordValidate">
                <FormItem label="OldPassword" prop="oldPass" :error="oldPassError">
                    <Input v-model="editPasswordForm.oldPass" placeholder="{{'Please enter the password you are using now'|l}}" ></Input>
                </FormItem>
                <FormItem label="NewPassword" prop="newPass">
                    <Input v-model="editPasswordForm.newPass" placeholder="{{'Please enter a new password, at least 6 characters'|l}}" ></Input>
                </FormItem>
                <FormItem label="ConfirmNewPassword" prop="rePass">
                    <Input v-model="editPasswordForm.rePass" placeholder="{{'Please re-enter the new password'|l}}" ></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelEditPass">{{'Cancel'|l}}</Button>
                <Button type="primary" :loading="savePassLoading" @click="saveEditPass">{{'Save'|l}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import util from '@/libs/util.js';
export default {
    name: 'ownspace_index',
    data () {
        const validePhone = (rule, value, callback) => {
            var re = /^1[0-9]{10}$/;
            if (!re.test(value)) {
                callback(new Error(util.l('Please enter the phone number in the correct format')));
            } else {
                callback();
            }
        };
        const valideRePassword = (rule, value, callback) => {
            if (value !== this.editPasswordForm.newPass) {
                callback(new Error(util.l('New password does not match with old password')));
            } else {
                callback();
            }
        };
        return {
            userForm: {
                name: '',
                cellphone: '',
                company: '',
                department: ''
            },
            uid: '', 
            securityCode: '', 
            phoneHasChanged: false,
            save_loading: false,
            identifyError: '', 
            editPasswordModal: false,
            savePassLoading: false,
            oldPassError: '',
            identifyCodeRight: false,
            hasGetIdentifyCode: false,
            canGetIdentifyCode: false,
            checkIdentifyCodeLoading: false,
            inforValidate: {
                name: [
                    { required: true, message: util.l('Please type in your name'), trigger: 'blur' }
                ],
                cellphone: [
                    { required: true, message: util.l('Please enter the phone number') },
                    { validator: validePhone }
                ]
            },
            editPasswordForm: {
                oldPass: '',
                newPass: '',
                rePass: ''
            },
            passwordValidate: {
                oldPass: [
                    { required: true, message: util.l('Please enter the original password'), trigger: 'blur' }
                ],
                newPass: [
                    { required: true, message: util.l('Please enter the new psasword'), trigger: 'blur' },
                    { min: 6, message: util.l('Please enter at least 6 characters'), trigger: 'blur' },
                    { max: 32, message: util.l('Please enter maximum 32 characters'), trigger: 'blur' }
                ],
                rePass: [
                    { required: true, message: util.l('Please re-enter the new password'), trigger: 'blur' },
                    { validator: valideRePassword, trigger: 'blur' }
                ]
            },
            inputCodeVisible: false,
            initPhone: '',
            gettingIdentifyCodeBtnContent: util.l('Get verification code')
        };
    },
    methods: {
        getIdentifyCode () {
            this.hasGetIdentifyCode = true;
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    this.canGetIdentifyCode = true;
                    let timeLast = 60;
                    let timer = setInterval(() => {
                        if (timeLast >= 0) {
                            this.gettingIdentifyCodeBtnContent = timeLast + '秒后重试';
                            timeLast -= 1;
                        } else {
                            clearInterval(timer);
                            this.gettingIdentifyCodeBtnContent = '获取验证码';
                            this.canGetIdentifyCode = false;
                        }
                    }, 1000);
                    this.inputCodeVisible = true;
                }
            });
        },
        showEditPassword () {
            this.editPasswordModal = true;
        },
        cancelEditUserInfor () {
            this.$store.commit('removeTag', 'ownspace_index');
            localStorage.pageOpenedList = JSON.stringify(this.$store.state.app.pageOpenedList);
            let lastPageName = '';
            if (this.$store.state.app.pageOpenedList.length > 1) {
                lastPageName = this.$store.state.app.pageOpenedList[1].name;
            } else {
                lastPageName = this.$store.state.app.pageOpenedList[0].name;
            }
            this.$router.push({
                name: lastPageName
            });
        },
        saveEdit () {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    if (this.phoneHasChanged && this.userForm.cellphone !== this.initPhone) {
                        if (this.hasGetIdentifyCode) { 
                            if (this.identifyCodeRight) {
                                this.saveInfoAjax();
                            } else {
                                this.$Message.error(util.l('Verification code error, please re-enter'));
                            }
                        } else {
                            this.$Message.warning(util.l('Please click to get the verification code'));
                        }
                    } else {
                        this.saveInfoAjax();
                    }
                }
            });
        },
        cancelEditPass () {
            this.editPasswordModal = false;
        },
        saveEditPass () {
            this.$refs['editPasswordForm'].validate((valid) => {
                if (valid) {
                    this.savePassLoading = true;
                }
            });
        },
        init () {
            this.userForm.name = 'Lison';
            this.userForm.cellphone = '17712345678';
            this.initPhone = '17712345678';
            this.userForm.company = 'AbpProjectName';
            this.userForm.department = 'IT';
        },
        cancelInputCodeBox () {
            this.inputCodeVisible = false;
            this.userForm.cellphone = this.initPhone;
        },
        submitCode () {
            let vm = this;
            vm.checkIdentifyCodeLoading = true;
            if (this.securityCode.length === 0) {
                this.$Message.error(util.l('Please fill in SMS verification code'));
            } else {
                setTimeout(() => {
                    this.$Message.success(util.l('The verification code is correct'));
                    this.inputCodeVisible = false;
                    this.checkIdentifyCodeLoading = false;
                }, 1000);
            }
        },
        hasChangePhone () {
            this.phoneHasChanged = true;
            this.hasGetIdentifyCode = false;
            this.identifyCodeRight = false;
        },
        saveInfoAjax () {
            this.save_loading = true;
            setTimeout(() => {
                this.$Message.success(util.l('SavedSuccessfully'));
                this.save_loading = false;
            }, 1000);
        }
    },
    mounted () {
        this.init();
    }
};
</script>
