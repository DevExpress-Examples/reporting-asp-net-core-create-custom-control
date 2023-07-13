using Microsoft.AspNetCore.Mvc;
using DevExpress.XtraReports.Web.ReportDesigner;
using DevExpress.XtraReports.Web.ReportDesigner.Services;

namespace Reporting_AspNetCore_Create_Custom_Control.Controllers {
    public class HomeController : Controller {
        public IActionResult Index([FromServices] IReportDesignerModelBuilder reportDesignerModelBuilder) {
            ReportDesignerModel model = reportDesignerModelBuilder
                .Report("TestReport")
                .CustomControls(typeof(MyControl), typeof(NumericLabel))
                .BuildModel();
            return View(model);
        }
    }
}
